export interface UploadedFile {
    objectPath: string;
    originalName: string;
    downloadUrl: string;
  }
  
  export interface UploadResponse {
    message: string;
    data: UploadedFile[];
  }