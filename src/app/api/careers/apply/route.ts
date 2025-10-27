import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/third-party/bunny.client';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const firstName = formData.get('firstName') as string | null;
    const lastName = formData.get('lastName') as string | null;
    const email = formData.get('email') as string | null;
    const phone = formData.get('phone') as string | null;
    const jobId = formData.get('jobId') as string | null;
    const file = formData.get('file') as File | null;

    // Basic validation
    if (!firstName || !lastName || !email || !jobId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let resumeUrl: string | null = null;
    if (file) {
      // Upload to the same bunny client used elsewhere
      resumeUrl = await uploadFile(file, `careers/${jobId}`);
    }

    // Persist application to backend job-applications endpoint
    try {
      const backend = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      await fetch(`${backend.replace(/\/$/, '')}/job-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: Number(jobId),
          firstName,
          lastName,
          email,
          phone,
          resumeUrl,
        }),
      });
    } catch (err) {
      // don't fail the user submission if backend persistence fails; log and continue
      console.error('Failed to persist application to backend', err);
    }

    return NextResponse.json({ success: true, data: { firstName, lastName, email, phone, jobId, resumeUrl } });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'An error occurred' }, { status: 500 });
  }
}
