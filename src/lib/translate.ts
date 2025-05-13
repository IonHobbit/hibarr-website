import { Translate } from '@google-cloud/translate/build/src/v2';

// Initialize the Translation client
const translate = new Translate({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

export type SupportedLanguage = 'en' | 'de' | 'tr';

export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  de: 'German',
  tr: 'Turkish',
};

export async function translateText(text: string, targetLang: SupportedLanguage): Promise<string> {
  if (targetLang === 'en') return text;

  try {
    const [translation] = await translate.translate(text, {
      from: 'en',
      to: targetLang,
    });

    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text if translation fails
  }
}

export async function translateObject<T extends Record<string, T>>(
  obj: T,
  targetLang: SupportedLanguage
): Promise<T> {
  if (targetLang === 'en') return obj;

  const translatedObj: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      translatedObj[key] = await translateText(value, targetLang);
    } else if (typeof value === 'object' && value !== null) {
      translatedObj[key] = await translateObject(value, targetLang);
    } else {
      translatedObj[key] = value;
    }
  }

  return translatedObj as T;
}

export async function handleTranslate(text: string, targetLang: SupportedLanguage): Promise<string> {
  const result = await fetch('/api/translate/deepl', {
    method: 'POST',
    body: JSON.stringify({ text, source: 'en', target: targetLang }),
  });
  const data = await result.json();
  return data.text;
}