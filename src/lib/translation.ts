import { HashedTranslationResponse } from "@/types/translation.type";
import { headers } from "next/headers"

export const translate = async (text?: string): Promise<HashedTranslationResponse> => {
  const headersList = await headers();
  const locale = headersList.get('x-locale');

  if (!locale) return { token: '', text: text || '' };

  if (!text) return { token: '', text: '' };

  const translation = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/translation`, {
    method: 'POST',
    body: JSON.stringify({ text, targetLang: locale }),
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ''
    }
  });

  const response = await translation.json();
  return response.data || { token: '', text: '' };
}

export const translateBatch = async (texts: string[]): Promise<HashedTranslationResponse[]> => {
  const translations = await Promise.all(texts.map(text => translate(text)));
  return translations;
}