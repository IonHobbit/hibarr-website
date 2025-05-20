import { NextResponse } from 'next/server';

const sanityHeaders = {
  'Authorization': `Bearer ${process.env.SANITY_SECRET_KEY}`,
  'Content-Type': 'application/json',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { document, collection } = body;

    if (!document || !collection) {
      return NextResponse.json(
        { error: 'Document and collection are required' },
        { status: 400 }
      );
    }

    // Ensure the document has the correct _type
    const documentWithType = {
      ...document,
      _type: collection
    };

    // Create the document using Sanity API directly
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/production`,
      {
        method: 'POST',
        headers: sanityHeaders,
        body: JSON.stringify({
          mutations: [
            {
              create: documentWithType
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create document');
    }

    const result = await response.json();
    return NextResponse.json({ success: true, document: result.results[0] });
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create document' },
      { status: 500 }
    );
  }
} 