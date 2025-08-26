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