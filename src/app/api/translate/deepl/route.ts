import { translate } from '@/lib/deepl';
import { translateText } from '@/lib/deepl';
import { type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { text, target } = await req.json()
  const result = await translateText(text, target)
  return Response.json(result)
}

export async function GET() {
  const result = await translate.getUsage();
  return Response.json(result)
}