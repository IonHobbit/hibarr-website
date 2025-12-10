import { getFileDetails } from '@/lib/third-party/minio.client';
import { DownloadError } from '@/lib/errors/download.errors';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const decodedSlug = decodeURIComponent(slug);
    const metadata = await getFileDetails(decodedSlug);
    return NextResponse.json({
      exists: true,
      size: metadata.size,
      lastModified: metadata.lastModified,
      contentType: metadata.metaData?.['content-type'] || null,
      originalName: metadata.metaData?.['original-name'] || null,
      etag: metadata.etag,
    });
  } catch (error) {
    // Handle DownloadError with proper status codes
    if (error instanceof DownloadError) {
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
          exists: false,
        },
        { status: error.statusCode }
      );
    }

    // Fallback for unknown errors
    console.error('Unexpected error getting file details:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get file details',
        code: 'UNKNOWN_ERROR',
        exists: false,
      },
      { status: 500 }
    );
  }
}
