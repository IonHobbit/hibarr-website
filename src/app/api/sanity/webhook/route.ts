import { translateText } from "@/lib/deepl";
import { TargetLanguageCode } from "deepl-node";
import { NextRequest, NextResponse } from "next/server";


export const sanityHeaders = {
  'Authorization': `Bearer ${process.env.SANITY_SECRET_KEY}`,
  'Content-Type': 'application/json',
}

const fetchDocumentTransactionIDs = async (id: string): Promise<string[]> => {
  const response = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.apicdn.sanity.io/v2025-04-10/data/history/production/transactions/${id}?excludeContent=true&limit=2&reverse=true`, {
    headers: sanityHeaders,
  });

  const data = await response.text();
  // Parse each line as JSON and filter out empty lines
  const transactions = data
    .split('\n')
    .filter(line => line.trim()) // Remove empty lines
    .map(line => JSON.parse(line))
    .map(({ id }) => id);

  return transactions;
}

const fetchDocumentHistory = async (documentId: string, revisionId: string): Promise<object> => {
  const response = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.apicdn.sanity.io/v2025-04-10/data/history/production/documents/${documentId}?revision=${revisionId}`, {
    headers: sanityHeaders,
  });

  const { documents: [document] } = await response.json();
  return document;
}

const fetchLanguageVersionsOfType = async (type: string): Promise<{ _id: string, language: string }[]> => {
  const response = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.apicdn.sanity.io/v2025-04-10/data/query/production?query=*[_type == "${type}"]{_id, language}`, {
    headers: sanityHeaders,
  });

  const data = await response.json();
  return data.result
}

const updateDocument = async (documentId: string, changes: Record<string, unknown>) => {
  const payload = {
    mutations: [
      {
        patch: {
          id: documentId,
          set: changes,
        }
      }
    ]
  }
  const response = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.apicdn.sanity.io/v2025-04-10/data/mutate/production`, {
    method: 'POST',
    headers: sanityHeaders,
    body: JSON.stringify(payload),
  });

  return response.json();
}

const translateChanges = async (changes: Record<string, unknown>, targetLanguage: TargetLanguageCode) => {
  // Create an array of translation promises
  const translationPromises = Object.entries(changes).map(async ([key, value]) => {
    const translatedValue = await translateText(value as string, targetLanguage);
    return [key, translatedValue];
  });

  // Wait for all translations to complete
  const translatedEntries = await Promise.all(translationPromises);

  // Convert the array of [key, value] pairs back to an object
  return Object.fromEntries(translatedEntries);
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { _id, _type } = body;

    const transactionIDs = await fetchDocumentTransactionIDs(_id);
    const [recentTransactionRevisionId, oldTransactionRevisionId] = transactionIDs;
    const recentDocument = await fetchDocumentHistory(_id, recentTransactionRevisionId);
    const oldDocument = await fetchDocumentHistory(_id, oldTransactionRevisionId);
    const changes = compareRevisions(recentDocument, oldDocument);

    const documentLanguageVersions = await fetchLanguageVersionsOfType(_type);
    const nonEnglishDocumentLanguageVersions = documentLanguageVersions.filter(({ language }) => language !== 'en');

    nonEnglishDocumentLanguageVersions.forEach(async ({ _id, language }) => {
      const translatedChanges = await translateChanges(changes, language as TargetLanguageCode);
      console.log(translatedChanges);
      await updateDocument(_id, translatedChanges);
      console.log(`Updated document ${_id} with language ${language}`);
    });

    return NextResponse.json({ message: "Webhook received" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function compareArrays(current: unknown[], previous: unknown[], path: string[]): Record<string, unknown> {
  const changes: Record<string, unknown> = {};

  // Compare array lengths
  if (current.length !== previous.length) {
    changes[[...path, 'length'].join('.')] = current.length;
  }

  // Compare each element
  current.forEach((item, index) => {
    const prevItem = previous[index];
    const itemPath = [...path, `[${index}]`];

    if (isObject(item) && isObject(prevItem)) {
      const nestedChanges = compareRevisions(item, prevItem, itemPath);
      Object.assign(changes, nestedChanges);
    } else if (isArray(item) && isArray(prevItem)) {
      const arrayChanges = compareArrays(item, prevItem, itemPath);
      Object.assign(changes, arrayChanges);
    } else if (JSON.stringify(item) !== JSON.stringify(prevItem)) {
      changes[itemPath.join('')] = item;
    }
  });

  return changes;
}

export function compareRevisions<T extends object>(
  current: T,
  previous: T | null | undefined,
  path: string[] = []
): Record<string, unknown> {
  if (!previous) {
    // If no previous revision, return all non-internal fields of current
    const changes: Record<string, unknown> = {};
    (Object.keys(current) as (keyof T)[]).forEach((key) => {
      if (!(key as string).startsWith('_')) {
        const currentValue = current[key];
        if (isObject(currentValue)) {
          const nestedChanges = compareRevisions(currentValue, undefined, [...path, key as string]);
          Object.assign(changes, nestedChanges);
        } else if (isArray(currentValue)) {
          const arrayChanges = compareArrays(currentValue, [], [...path, key as string]);
          Object.assign(changes, arrayChanges);
        } else {
          changes[[...path, key as string].join('.')] = currentValue;
        }
      }
    });
    return changes;
  }

  const changes: Record<string, unknown> = {};

  // Check for changed or added fields
  (Object.keys(current) as (keyof T)[]).forEach((key) => {
    // Skip internal fields
    if ((key as string).startsWith('_')) return;

    const currentValue = current[key];
    const previousValue = previous[key];

    if (isObject(currentValue) && isObject(previousValue)) {
      // Recursively compare nested objects
      const nestedChanges = compareRevisions(currentValue, previousValue, [...path, key as string]);
      Object.assign(changes, nestedChanges);
    } else if (isArray(currentValue) && isArray(previousValue)) {
      // Compare arrays
      const arrayChanges = compareArrays(currentValue, previousValue, [...path, key as string]);
      Object.assign(changes, arrayChanges);
    } else if (JSON.stringify(currentValue) !== JSON.stringify(previousValue)) {
      // Only add to changes if the values are different
      changes[[...path, key as string].join('.')] = currentValue;
    }
  });

  // Check for removed fields
  (Object.keys(previous) as (keyof T)[]).forEach((key) => {
    if (!(key as string).startsWith('_') && current[key] === undefined) {
      changes[[...path, key as string].join('.')] = null;
    }
  });

  return changes;
}
