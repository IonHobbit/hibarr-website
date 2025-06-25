import { headers } from "next/headers"
import { HashedTranslationResponse } from "@/types/translation.type";
import { runTranslation } from "./services/translation.service";

export const translate = async (text?: string): Promise<HashedTranslationResponse> => {
  const headersList = await headers();
  const locale = headersList.get('x-locale');

  if (!locale) return { token: '', text: text || '' };

  if (!text) return { token: '', text: '' };

  return runTranslation(text, locale);
}

export const translateBatch = async (texts: string[]): Promise<HashedTranslationResponse[]> => {
  const translations = await Promise.all(texts.map(text => translate(text)));
  return translations;
}