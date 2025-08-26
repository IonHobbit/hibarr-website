import { APIRequestError, makePOSTRequest } from "@/lib/services/api.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await makePOSTRequest('/registration/webinar', body);
    return NextResponse.json(response);
  } catch (error: unknown) {
    if (error instanceof APIRequestError) {
      // Simple error response
      return NextResponse.json(
        {
          message: error.message || 'An error occurred',
          status: 'error'
        },
        { status: error.status || 500 }
      );
    }
  }
}