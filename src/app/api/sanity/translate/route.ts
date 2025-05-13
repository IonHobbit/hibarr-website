import { NextRequest, NextResponse } from "next/server";
import { compareRevisions, sanityHeaders } from "../webhook/route";

const fetchDocumentType = async (id: string) => {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.apicdn.sanity.io/v2025-04-10/data/query/production?query=*[_id == "${id}"][0]`, {
    headers: sanityHeaders,
  });

  const data = await response.json();

  if (data.result.language !== 'en') {
    return null;
  }

  return data.result;
}

const fetchDocuments = async (type: string) => {
  const response = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.apicdn.sanity.io/v2025-04-10/data/query/production?query=*[_type == "${type}"]{_id, language}`, {
    headers: sanityHeaders,
  });

  const data = await response.json();
  return data.result;
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Document ID is required' }, { status: 400 })
  }

  const document = await fetchDocumentType(id)
  const documentType = document._type;

  const cleanedDoc = compareRevisions(document, null);

  const documents = await fetchDocuments(documentType);

  const nonEnglishDocuments = documents.filter((document: any) => document.language !== 'en');

  return NextResponse.json({ cleanedDoc, documentType, documents, nonEnglishDocuments })
}
