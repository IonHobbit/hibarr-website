import { UploadResponse } from '@/types/upload';

/**
 * Uploads a file to the backend using multipart/form-data
 * @param file - The file to upload
 * @param targetFolder - Optional target folder path (e.g., "resumes")
 * @param bucketName - Optional bucket name (e.g., "backend-uploads")
 * @returns The downloadUrl of the uploaded file (signed URL from backend)
 */
export async function uploadFile(file: File, targetFolder?: string, bucketName?: string): Promise<string> {
  // Validate file size (10MB limit)
  const maxSizeBytes = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSizeBytes) {
    throw new Error(`File size exceeds the maximum limit of 10MB. Please choose a smaller file.`);
  }

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
  const backendBaseURL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/+$/, '');
  const backendUrl = queryString 
    ? `${backendBaseURL}/upload?${queryString}`
    : `${backendBaseURL}/upload`;

  const headers: HeadersInit = {};
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (apiKey) {
    headers['X-Api-Key'] = apiKey;
  }

  const response = await fetch(backendUrl, {
    method: 'POST',
    headers,
    body: formData,
    // Do NOT set Content-Type header - browser will automatically set
    // multipart/form-data with boundary for FormData
  });

  if (!response.ok) {
    let errorText = 'Failed to upload file';
    try {
      const errorData = await response.json();
      errorText = errorData.error || errorData.message || errorData._code || errorText;
    } catch {
      errorText = await response.text().catch(() => errorText);
    }
    const error = new Error(errorText || `Upload failed with status ${response.status}`);
    (error as any).status = response.status;
    (error as any).code = response.status;
    throw error;
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

