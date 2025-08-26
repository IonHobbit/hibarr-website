import axios, { AxiosError, AxiosResponse } from 'axios';

export type APIResponse<T> = {
  data: T;
  message: string;
  status: 'success' | 'error';
}

export class APIRequestError extends Error {
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
    this.name = 'APIRequestError';
    this.status = status;
    this.details = details;
    this.code = code;

    console.log(this)
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
  },
});

// Response interceptor to handle successful responses
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle axios errors and convert to our custom error format
    if (error.response) {
      // Server responded with error status
      const { data, status } = error.response;
      const errorData = data as any;

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

export const makeAPIRequest = async <T>(url: string, options: any = {}): Promise<APIResponse<T>> => {
  const response = await apiClient.request({
    url: url.startsWith('/') ? url : `/${url}`,
    ...options,
  });

  return response.data;
}

export const makePOSTRequest = async <T>(url: string, body: unknown, options: any = {}): Promise<APIResponse<T>> => {
  return makeAPIRequest<T>(url, {
    method: 'POST',
    data: body,
    ...options,
  });
}

export const makeGETRequest = async <T>(url: string, options: any = {}): Promise<APIResponse<T>> => {
  return makeAPIRequest<T>(url, {
    method: 'GET',
    ...options,
  });
}