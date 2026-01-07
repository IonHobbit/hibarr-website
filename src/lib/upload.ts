import { UploadResponse } from '@/types/upload';
import { makePOSTRequest, makeAPIRequest, handleAPIError, APIRequestError } from '@/lib/services/api.service';


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
  const url = queryString ? `/upload?${queryString}` : '/upload';

  try {
    // Override Content-Type header to let axios set it automatically for FormData
    const response = await makePOSTRequest<UploadResponse>(url, formData, {
      headers: {
        'Content-Type': undefined, // Let axios set Content-Type with boundary for FormData
      },
    });

    if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
      const uploadedFile = response.data.data[0];
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
    handleAPIError(error, 'uploadFile');
    throw error; // Unreachable, but satisfies TypeScript
  }
}

export async function deleteFile(objectPath: string): Promise<void> {
  const params = new URLSearchParams();
  params.append('objectPath', objectPath);
  
  const url = `/upload?${params.toString()}`;

  try {
    await makeAPIRequest(url, {
      method: 'DELETE',
    });
  } catch (error) {
    handleAPIError(error, 'deleteFile');
  }
}

