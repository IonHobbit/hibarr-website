import { useQuery } from '@tanstack/react-query';

interface FileDetails {
  exists: boolean;
  size: number;
  lastModified: Date;
  contentType: string | null;
  originalName: string | null;
  etag: string;
}

interface ApiErrorResponse {
  error: string;
  code?: string;
  exists?: boolean;
}

const fetchFileDetails = async (slug: string): Promise<FileDetails> => {
  const response = await fetch(`/api/downloads/${encodeURIComponent(slug)}/details`);

  if (!response.ok) {
    let errorMessage = 'Failed to get file details';
    let errorCode = 'UNKNOWN_ERROR';

    try {
      const errorData: ApiErrorResponse = await response.json();
      errorMessage = errorData.error || errorMessage;
      errorCode = errorData.code || errorCode;
    } catch {
      // If response is not JSON, use status-based messages
      switch (response.status) {
        case 404:
          errorMessage = 'File not found';
          errorCode = 'FILE_NOT_FOUND';
          break;
        case 403:
          errorMessage = 'Access denied';
          errorCode = 'PERMISSION_DENIED';
          break;
        case 503:
          errorMessage = 'Service unavailable';
          errorCode = 'SERVICE_UNAVAILABLE';
          break;
        default:
          errorMessage = `Failed to get file details (${response.status})`;
      }
    }

    const error = new Error(errorMessage) as Error & { code?: string; statusCode?: number };
    error.code = errorCode;
    error.statusCode = response.status;
    throw error;
  }

  const data = await response.json();
  return {
    ...data,
    lastModified: new Date(data.lastModified),
  };
};

export default function useDownloadFileDetails(slug: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['downloadFileDetails', slug],
    queryFn: () => fetchFileDetails(slug),
    enabled,
    retry: (failureCount, error) => {
      // Don't retry on client errors (4xx) or if explicitly disabled
      if (error && typeof error === 'object' && 'statusCode' in error) {
        const statusCode = error.statusCode as number;
        if (statusCode >= 400 && statusCode < 500) {
          return false;
        }
      }
      // Retry up to 2 times for server errors
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
}
