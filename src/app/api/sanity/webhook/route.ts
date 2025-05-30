import { TargetLanguageCode } from "deepl-node";
import { NextRequest, NextResponse } from "next/server";
import { fetchDocumentTransactionIDs, fetchLanguageVersionsOfType } from "./service";
import { updateDocument } from "./service";
import { translateChanges } from "./service";
import { compareRevisions } from "./service";
import { fetchDocumentHistory } from "./service";
import { sendNtfyNotification } from "@/lib/third-party/ntfy.client";

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
      await sendNtfyNotification(`Updated document ${_id} with language ${language}`);
      await sendNtfyNotification(`Translated changes for ${_id} with language ${language}: ${JSON.stringify(translatedChanges)}`);
      console.log(`Updated document ${_id} with language ${language}`);
    });

    return NextResponse.json({ message: "Webhook received" });
  } catch (error) {
    console.error(error);
    await sendNtfyNotification(`Error updating document ${error}`);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};