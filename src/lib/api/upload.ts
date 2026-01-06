import { UploadResponse, UploadErrorResponse } from '@/types/upload';


export async function uploadFile(
  file: File, 
  targetFolder?: string
): Promise<{ url: string; objectPath: string; originalName: string }> {
  const maxSizeBytes = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSizeBytes) {
    throw new Error(`File size exceeds the maximum limit of 10MB. Please choose a smaller file.`);
  }

  const formData = new FormData();
  formData.append('file', file);

  const params = new URLSearchParams();
  if (targetFolder) {
    params.append('targetFolder', targetFolder);
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

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers,
      body: formData, // FormData automatically sets multipart/form-data
    });

    if (!response.ok) {
      let errorText = 'Failed to upload file';
      try {
        const errorData = await response.json();
        errorText = errorData.error || errorData.message || errorData._code || errorText;
      } catch {
        errorText = await response.text().catch(() => errorText);
      }
      const error = new Error(errorText || `Upload failed with status ${response.status}`) as Error & { status: number; code: number };
      error.status = response.status;
      error.code = response.status;
      throw error;
    }

    const data: UploadResponse = await response.json();
    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      const uploadedFile = data.data[0];
      if (uploadedFile.downloadUrl && uploadedFile.objectPath && uploadedFile.originalName) {
        return {
          url: uploadedFile.downloadUrl,
          objectPath: uploadedFile.objectPath,
          originalName: uploadedFile.originalName,
        };
      }
    }

    throw new Error('Invalid response format from upload endpoint: missing required fields');
  } catch (error) {
    // Re-throw with more context if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Failed to connect to upload server. Please check your connection.');
    }
    throw error;
  }
}

export async function deleteFile(objectPath: string): Promise<void> {
  const backendBaseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  

  const params = new URLSearchParams();
  params.append('objectPath', objectPath);
  
  const urlString = `${backendBaseURL}/upload?${params.toString()}`;
  
  const headers: HeadersInit = {};
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  if (apiKey) {
    headers['X-Api-Key'] = apiKey;
  }

  try {
    const response = await fetch(urlString, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({ error: 'Failed to delete file' }))) as UploadErrorResponse;
      const errorMessage = errorData.error || errorData.message || `Delete failed with status ${response.status}`;
      throw new Error(errorMessage);
    }
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Failed to connect to delete server. Please check your connection.');
    }
    throw error;
  }
}

