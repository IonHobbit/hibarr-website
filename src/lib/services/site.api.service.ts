import axios, { AxiosError, AxiosResponse } from 'axios';

export type SiteAPIResponse<T> = {
  data: T;
  message: string;
  status: 'success' | 'error';
}

export class SiteAPIError extends Error {
  public status: number;
  public details?: any;
  public code?: string;

  constructor(
    message: string = 'An unexpected error occurred',
    status: number = 500,
    details?: any,
    code?: string
  ) {
    super(message);
    this.name = 'SiteAPIError';
    this.status = status;
    this.details = details;
    this.code = code;
  }
}

// Create axios instance for Next.js API routes
const siteApiClient = axios.create({
  baseURL: '/api', // Points to Next.js API routes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle errors
siteApiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      const { data, status } = error.response;
      const errorData = data as any;

      throw new SiteAPIError(
        errorData?.message || error.message,
        status || 500,
        errorData?.details || errorData,
        errorData?.code
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new SiteAPIError(
        'No response from server. Please check your connection.',
        0,
        { originalError: error.message }
      );
    } else {
      // Something else happened
      throw new SiteAPIError(
        error.message || 'An unexpected error occurred',
        500,
        { originalError: error.message }
      );
    }
  }
);

export const siteAPI = siteApiClient;

// export const makeSiteAPIRequest = async <T>(url: string, options: any = {}): Promise<SiteAPIResponse<T>> => {
//   const response = await siteApiClient.request({
//     url: url.startsWith('/') ? url : `/${url}`,
//     ...options,
//   });

//   return response.data;
// }

// export const makeSitePOSTRequest = async <T>(url: string, body: unknown, options: any = {}): Promise<SiteAPIResponse<T>> => {
//   return makeSiteAPIRequest<T>(url, {
//     method: 'POST',
//     data: body,
//     ...options,
//   });
// }

// export const makeSiteGETRequest = async <T>(url: string, options: any = {}): Promise<SiteAPIResponse<T>> => {
//   return makeSiteAPIRequest<T>(url, {
//     method: 'GET',
//     ...options,
//   });
// }

// Utility functions for error handling
export const getSiteErrorMessage = (error: unknown): string => {
  if (error instanceof SiteAPIError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred';
};

export const getSiteErrorStatus = (error: unknown): number | undefined => {
  if (error instanceof SiteAPIError) {
    return error.status;
  }

  return undefined;
};

export const getSiteErrorDetails = (error: unknown): any => {
  if (error instanceof SiteAPIError) {
    return error.details;
  }

  return undefined;
};

export const isSiteAPIError = (error: unknown): error is SiteAPIError => {
  return error instanceof SiteAPIError;
};
