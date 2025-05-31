import { NextRequest, NextResponse } from "next/server";
import { compareRevisions, translateChanges, fetchDocumentHistory, fetchDocumentTransactionIDs, fetchLanguageVersionsOfType, updateDocument } from "../webhook/service";
import { sanityHeaders } from "../webhook/service";
import { TargetLanguageCode } from "deepl-node";
import { sendNtfyNotification } from "@/lib/third-party/ntfy.client";

const fetchDocumentType = async (id: string) => {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.apicdn.sanity.io/v2025-04-10/data/query/production?query=*[_id == "${id}"][0]`, {
    headers: sanityHeaders,
  });

  const data = await response.json();

  if (data.result.language !== 'en') {
    return null;
  }

  return data.result._type;
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Document ID is required' }, { status: 400 })
  }

  try {
    const type = await fetchDocumentType(id)
    const transactionIDs = await fetchDocumentTransactionIDs(id);
    const [recentTransactionRevisionId, oldTransactionRevisionId] = transactionIDs;
    const recentDocument = await fetchDocumentHistory(id, recentTransactionRevisionId);
    const oldDocument = await fetchDocumentHistory(id, oldTransactionRevisionId);
    const changes = compareRevisions(recentDocument, oldDocument);


    const documentLanguageVersions = await fetchLanguageVersionsOfType(type);
    const nonEnglishDocumentLanguageVersions = documentLanguageVersions.filter(({ language }) => language !== 'en');

    await Promise.all(
      nonEnglishDocumentLanguageVersions.map(async ({ _id, language }) => {
        const translatedChanges = await translateChanges(changes, language as TargetLanguageCode);
        await updateDocument(_id, translatedChanges);
        await sendNtfyNotification(`Translated changes for ${type} document with language ${language}: ${JSON.stringify(translatedChanges)}`);
      })
    );

    return NextResponse.json({ message: "Webhook received" });
  } catch (error) {
    console.log(error);
    await sendNtfyNotification(`Error updating document ${JSON.stringify(error)}`);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
