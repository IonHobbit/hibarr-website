import { uploadFile } from "@/lib/third-party/bunny.client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const folderName = formData.get('folderName') as string;

  const fileUrl = await uploadFile(file, folderName);

  return NextResponse.json({ fileUrl });
}