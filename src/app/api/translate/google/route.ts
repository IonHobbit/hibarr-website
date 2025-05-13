import { Translate } from '@google-cloud/translate/build/src/v2';
import { type NextRequest } from 'next/server'

const translate = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY });

export async function POST(req: NextRequest) {
  const { text, target } = await req.json()
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  const [translations] = await translate.translate(text, target);
  const translationArray = Array.isArray(translations) ? translations : [translations];
  console.log('Translations:');
  translationArray.forEach((translation: string) => {
    console.log(`${text} => (${target}) ${translation}`);
  });

  return Response.json(translationArray)
}