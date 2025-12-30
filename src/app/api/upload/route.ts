import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Read query parameters
    const { searchParams } = new URL(request.url);
    const targetFolder = searchParams.get('targetFolder');
    const bucketName = searchParams.get('bucketName');

    // Parse multipart/form-data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type (only allow PDF, DOC, DOCX for resumes)
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit.' },
        { status: 400 }
      );
    }

    // Create FormData to forward to backend as multipart/form-data
    // Only include the file in the body, not the query parameters
    const backendFormData = new FormData();
    backendFormData.append('file', file, file.name);

    // Forward the file to the backend API
    const backendBaseURL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/+$/, '');
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    // Build query parameters for the backend URL
    const backendParams = new URLSearchParams();
    if (targetFolder) {
      backendParams.append('targetFolder', targetFolder);
    }
    if (bucketName) {
      backendParams.append('bucketName', bucketName);
    }

    const queryString = backendParams.toString();
    const backendUrl = queryString 
      ? `${backendBaseURL}/upload?${queryString}`
      : `${backendBaseURL}/upload`;

    const headers: HeadersInit = {};
    if (apiKey) {
      headers['X-Api-Key'] = apiKey;
    }
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers,
      body: backendFormData,
    });

    if (!response.ok) {
      let errorText = 'Failed to upload file';
      try {
        const errorData = await response.json();
        errorText = errorData.error || errorData.message || errorText;
      } catch {
        errorText = await response.text().catch(() => errorText);
      }
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

