import * as Minio from 'minio';
import { DownloadError } from '@/lib/errors/download.errors';

const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || '';
const MINIO_PORT = parseInt(process.env.MINIO_PORT || '443', 10);
const MINIO_USE_SSL = process.env.MINIO_USE_SSL === 'true';
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY || '';
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY || '';
const MINIO_BUCKET_NAME = process.env.MINIO_BUCKET_NAME || '';

// Lazy load MinIO client instance
let minioClient: Minio.Client | null = null;

const getMinioClient = () => {
  if (!minioClient) {
    minioClient = new Minio.Client({
      endPoint: MINIO_ENDPOINT,
      port: MINIO_PORT,
      useSSL: MINIO_USE_SSL,
      accessKey: MINIO_ACCESS_KEY,
      secretKey: MINIO_SECRET_KEY,
    });
  }
  return minioClient;
};

/**
 * Downloads a file from MinIO bucket
 * @param objectName - The name/key of the object in the bucket (slug)
 * @returns Promise resolving to the file buffer and metadata
 * @throws {DownloadError} When file cannot be downloaded
 */
export const downloadFile = async (objectName: string): Promise<{
  buffer: Buffer;
  metadata: Minio.BucketItemStat;
}> => {
  try {
    const assetsPath = `assets/${objectName}`;
    // Check if object exists and get its metadata
    const stat = await getMinioClient().statObject(MINIO_BUCKET_NAME, assetsPath);

    // Get the object as a stream
    const dataStream = await getMinioClient().getObject(MINIO_BUCKET_NAME, assetsPath);

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of dataStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    return {
      buffer,
      metadata: stat,
    };
  } catch (error) {
    throw DownloadError.fromMinioError(error, objectName);
  }
};

/**
 * Gets file details/metadata from MinIO bucket without downloading the file
 * @param objectName - The name/key of the object in the bucket (slug)
 * @returns Promise resolving to the file metadata
 * @throws {DownloadError} When file details cannot be retrieved
 */
export const getFileDetails = async (objectName: string): Promise<Minio.BucketItemStat> => {
  try {
    const assetsPath = `assets/${objectName}`;
    // Get object metadata without downloading
    const stat = await getMinioClient().statObject(MINIO_BUCKET_NAME, assetsPath);
    return stat;
  } catch (error) {
    throw DownloadError.fromMinioError(error, objectName);
  }
};

/**
 * Gets the content type for a file based on its extension
 * @param objectName - The name/key of the object
 * @returns The MIME type string
 */
export const getContentType = (objectName: string): string => {
  const extension = objectName.split('.').pop()?.toLowerCase();

  const contentTypes: Record<string, string> = {
    pdf: 'application/pdf',
    zip: 'application/zip',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    txt: 'text/plain',
    json: 'application/json',
    xml: 'application/xml',
    csv: 'text/csv',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    mp4: 'video/mp4',
    mp3: 'audio/mpeg',
  };

  return contentTypes[extension || ''] || 'application/octet-stream';
};
