import axios, { AxiosError } from 'axios';

export type APIResponse<T> = {
  data: T;
  message: string;
  status: 'success' | 'error';
}

export type APIPaginatedResponse<T> = {
  current_page: number;
  data: T[];
  from: number;
  last_page: number;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  status: string;
  to: number;
  total: number;
};

export class APIRequestError extends Error {
  public status: number;
  public details?: unknown;
  public code?: string;

  constructor(
    message: string = 'An unexpected error occurred',
    status: number = 500,
    details?: unknown,
    code?: string
  ) {
    super(message);
    this.name = 'APIRequestError';
    this.status = status;
    this.details = details;
    this.code = code;
  }
}

const CRM_API_URL = process.env.NEXT_PUBLIC_CRM_API_URL;
const CRM_API_TOKEN = process.env.NEXT_PUBLIC_CRM_API_TOKEN;

// Create axios instance with default config
const crmApiClient = axios.create({
  baseURL: CRM_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-TOKEN': CRM_API_TOKEN,
    'X-COMPANY-ID': 1,
  },
});

// Response interceptor to handle successful responses
crmApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle axios errors and convert to our custom error format
    if (error.response) {
      // Server responded with error status
      const { data, status } = error.response;
      const errorData = data as { message: string, details: unknown, code: string };

      throw new APIRequestError(
        errorData?.message || error.message,
        status || 500,
        errorData?.details || errorData,
        errorData?.code
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new APIRequestError(
        'No response from server. Please check your connection.',
        0,
        { originalError: error.message }
      );
    } else {
      // Something else happened
      throw new APIRequestError(
        error.message || 'An unexpected error occurred',
        500,
        { originalError: error.message }
      );
    }
  }
);

export const makeCRMAPIRequest = async <T>(url: string, options: object = {}): Promise<T> => {
  const response = await crmApiClient.request({
    url: url.startsWith('/') ? url : `/${url}`,
    ...options,
  });

  return response.data;
}

export const makeCRMPOSTRequest = async <T>(url: string, body: unknown, options: object = {}): Promise<T> => {
  return makeCRMAPIRequest<T>(url, {
    method: 'POST',
    data: body,
    ...options,
  });
}

export const makeCRMGETRequest = async <T>(url: string, options: object = {}): Promise<T> => {
  return makeCRMAPIRequest<T>(url, {
    method: 'GET',
    ...options,
  });
}

export const isCRMAPIError = (error: unknown): error is APIRequestError => {
  return error instanceof APIRequestError;
};

// Error handler function for try-catch blocks
export const handleCRMAPIError = (error: unknown, context?: string): never => {
  // Log the error with context for debugging
  console.error(`API Error${context ? ` in ${context}` : ''}:`, error);

  // If it's already our custom error, re-throw it
  if (error instanceof APIRequestError) {
    throw error;
  }

  // If it's an axios error, convert it
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error status
      const { data, status } = error.response;
      const errorData = data as { message: string, details: unknown, code: string };

      throw new APIRequestError(
        errorData?.message || error.message,
        status || 500,
        errorData?.details || errorData,
        errorData?.code
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new APIRequestError(
        'No response from server. Please check your connection.',
        0,
        { originalError: error.message }
      );
    } else {
      // Something else happened
      throw new APIRequestError(
        error.message || 'An unexpected error occurred',
        500,
        { originalError: error.message }
      );
    }
  }

  // If it's a standard Error, convert it
  if (error instanceof Error) {
    throw new APIRequestError(
      error.message,
      500,
      { originalError: error.message }
    );
  }

  // If it's a string, convert it
  if (typeof error === 'string') {
    throw new APIRequestError(
      error,
      500,
      { originalError: error }
    );
  }

  // Fallback for unknown error types
  throw new APIRequestError(
    'An unexpected error occurred',
    500,
    { originalError: String(error) }
  );
};