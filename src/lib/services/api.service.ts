export type APIResponse<T> = {
  data: T;
  message: string;
  status: 'success' | 'error';
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const makeAPIRequest = async <T>(url: string, options: RequestInit): Promise<APIResponse<T>> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const makePOSTRequest = async <T>(url: string, body: unknown, options?: RequestInit): Promise<APIResponse<T>> => {
  return makeAPIRequest(url, {
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  });
}

export const makeGETRequest = async <T>(url: string, options?: RequestInit): Promise<APIResponse<T>> => {
  return makeAPIRequest(url, {
    method: 'GET',
    ...options,
  });
}