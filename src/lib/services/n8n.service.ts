const N8N_BASE_URL = process.env.NEXT_PUBLIC_N8N_URL

export const makeN8NRequest = async <T>(url: string, options: RequestInit): Promise<T> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${N8N_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const makeN8NPOSTRequest = async <T>(url: string, body: unknown, options?: RequestInit): Promise<T> => {
  return makeN8NRequest(url, {
    method: 'POST',
    body: JSON.stringify(body),
    ...options,
  });
}

export const makeN8NGETRequest = async <T>(url: string, options?: RequestInit): Promise<T> => {
  return makeN8NRequest(url, {
    method: 'GET',
    ...options,
  });
}