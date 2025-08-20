export type APIResponse<T> = {
  data: T;
  message: string;
  status: 'success' | 'error';
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const makeAPIRequest = async <T>(url: string, options: RequestInit): Promise<APIResponse<T>> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
  };

  const response = await fetch(`${API_BASE_URL}${url.startsWith('/') ? url : `/${url}`}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Unknown error');
  }

  return response.json();
}

export const makePOSTRequest = async <T>(url: string, body: unknown, options?: RequestInit): Promise<APIResponse<T>> => {
  try {
    const response = await makeAPIRequest(url, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    });

    return response as APIResponse<T>;
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
}

export const makeGETRequest = async <T>(url: string, options?: RequestInit): Promise<APIResponse<T>> => {
  return makeAPIRequest(url, {
    method: 'GET',
    ...options,
  });
}