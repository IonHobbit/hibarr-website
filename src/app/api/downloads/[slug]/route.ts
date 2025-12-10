import { downloadFile, getContentType } from '@/lib/third-party/minio.client';
import { DownloadError, DownloadErrorCode } from '@/lib/errors/download.errors';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  try {
    const decodedSlug = decodeURIComponent(slug);
    const { buffer, metadata } = await downloadFile(decodedSlug);
    
    const contentType = metadata.metaData?.['content-type'] || getContentType(decodedSlug);
    const fileName = metadata.metaData?.['original-name'] || decodedSlug.split('/').pop() || decodedSlug;

    // Return file as download response
    // Convert Buffer to Uint8Array for NextResponse compatibility
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    // Handle DownloadError with proper status codes
    if (error instanceof DownloadError) {
      return new NextResponse(
        JSON.stringify({
          error: error.message,
          code: error.code,
        }),
        {
          status: error.statusCode,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Fallback for unknown errors
    console.error('Unexpected error downloading file:', error);
    return new NextResponse(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Error downloading file',
        code: DownloadErrorCode.UNKNOWN_ERROR,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
