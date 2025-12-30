/**
 * Represents a single uploaded file in the backend response
 */
export interface UploadedFile {
    objectPath: string;
    originalName: string;
    downloadUrl: string;
  }
  
  /**
   * Backend upload API response format
   */
  export interface UploadResponse {
    message: string;
    data: UploadedFile[];
  }