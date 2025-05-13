import * as deepl from 'deepl-node'

export const translate = new deepl.Translator(process.env.DEEPL_API_KEY || '');

export async function translateText(text: string, targetLang: deepl.TargetLanguageCode): Promise<string> {
  const result = await translate.translateText(text, 'en', targetLang);
  return result.text;
}
