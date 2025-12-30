import { UploadResponse } from '@/types/upload';

/**
 * Uploads a file to the server using multipart/form-data
 * @param file - The file to upload
 * @param targetFolder - Optional target folder path (e.g., "resumes")
 * @param bucketName - Optional bucket name (e.g., "backend-uploads")
 * @returns The downloadUrl of the uploaded file (signed URL from backend)
 */
export async function uploadFile(file: File, targetFolder?: string, bucketName?: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  // Build query string with proper encoding
  const params = new URLSearchParams();
  if (targetFolder) {
    params.append('targetFolder', targetFolder);
  }
  if (bucketName) {
    params.append('bucketName', bucketName);
  }

  const queryString = params.toString();
  const url = queryString ? `/api/upload?${queryString}` : '/api/upload';

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    // Do NOT set Content-Type header - browser will automatically set
    // multipart/form-data with boundary for FormData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Failed to upload file' }));
    throw new Error(errorData.error || `Upload failed with status ${response.status}`);
  }

  const data: UploadResponse = await response.json();
  
  if (data.data && Array.isArray(data.data) && data.data.length > 0) {
    const uploadedFile = data.data[0];
    if (uploadedFile.downloadUrl) {
      return uploadedFile.downloadUrl;
    }
  }

  throw new Error('Invalid response format from upload endpoint: missing downloadUrl');
}

