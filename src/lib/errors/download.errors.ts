/**
 * Custom error classes for download operations
 */

export enum DownloadErrorCode {
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  CONNECTION_ERROR = 'CONNECTION_ERROR',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  INVALID_CONFIGURATION = 'INVALID_CONFIGURATION',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export class DownloadError extends Error {
  public code: DownloadErrorCode;
  public statusCode: number;

  constructor(
    message: string,
    code: DownloadErrorCode = DownloadErrorCode.UNKNOWN_ERROR,
    statusCode: number = 500
  ) {
    super(message);
    this.name = 'DownloadError';
    this.code = code;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, DownloadError.prototype);
  }

  static fromMinioError(error: unknown, objectName: string): DownloadError {
    if (error && typeof error === 'object' && 'code' in error) {
      const errorCode = error.code as string;
      
      // MinIO error codes
      if (errorCode === 'NotFound' || errorCode === 'NoSuchKey') {
        return new DownloadError(
          `File with key "${objectName}" not found in bucket`,
          DownloadErrorCode.FILE_NOT_FOUND,
          404
        );
      }
      
      if (errorCode === 'AccessDenied' || errorCode === 'Forbidden') {
        return new DownloadError(
          `Access denied to file "${objectName}"`,
          DownloadErrorCode.PERMISSION_DENIED,
          403
        );
      }
    }

    // Check error message for common patterns
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      
      if (message.includes('does not exist') || message.includes('not found') || message.includes('nosuchkey')) {
        return new DownloadError(
          `File with key "${objectName}" not found in bucket`,
          DownloadErrorCode.FILE_NOT_FOUND,
          404
        );
      }
      
      if (message.includes('access denied') || message.includes('forbidden') || message.includes('permission')) {
        return new DownloadError(
          `Access denied to file "${objectName}"`,
          DownloadErrorCode.PERMISSION_DENIED,
          403
        );
      }
      
      if (message.includes('connect') || message.includes('timeout') || message.includes('econnrefused')) {
        return new DownloadError(
          `Unable to connect to storage service`,
          DownloadErrorCode.CONNECTION_ERROR,
          503
        );
      }
      
      if (message.includes('503') || message.includes('service unavailable')) {
        return new DownloadError(
          `Storage service is currently unavailable`,
          DownloadErrorCode.SERVICE_UNAVAILABLE,
          503
        );
      }
      
      if (message.includes('invalid') || message.includes('configuration') || message.includes('credentials')) {
        return new DownloadError(
          `Invalid storage configuration`,
          DownloadErrorCode.INVALID_CONFIGURATION,
          500
        );
      }
    }

    // Default error
    return new DownloadError(
      error instanceof Error ? error.message : `Failed to access file "${objectName}"`,
      DownloadErrorCode.UNKNOWN_ERROR,
      500
    );
  }
}
