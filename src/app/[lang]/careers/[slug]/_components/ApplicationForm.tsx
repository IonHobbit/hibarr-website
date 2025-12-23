'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useTranslation from '@/hooks/useTranslation';

export default function ApplicationForm({ jobId }: { jobId: string }) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Translation hooks
  const { data: firstNameLabel } = useTranslation('First name');
  const { data: lastNameLabel } = useTranslation('Last name');
  const { data: emailLabel } = useTranslation('Email address');
  const { data: phoneLabel } = useTranslation('Phone (optional)');
  const { data: resumeLabel } = useTranslation('Resume / CV');
  const { data: browseText } = useTranslation('Browse');
  const { data: changeFileText } = useTranslation('Change file');
  const { data: submitText } = useTranslation('Submit Application');
  const { data: resumeRequiredError } = useTranslation('Please upload your resume/CV');
  const { data: successMessage } = useTranslation('Application submitted. Thank you!');
  const { data: errorMessage } = useTranslation('An error occurred');

  async function onSubmit(e: React.FormEvent) {
    if (isSubmitting) return;
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Validate required fields
    if (!file) {
      setMessage(resumeRequiredError?.text || 'Please upload your resume/CV');
      setIsSubmitting(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append('firstName', firstName);
      fd.append('lastName', lastName);
      fd.append('email', email);
      if (phone) fd.append('phone', phone);
      fd.append('file', file);
      fd.append('jobId', jobId);

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) throw new Error('Submission failed');
      await res.json();
      setMessage(successMessage?.text || 'Application submitted. Thank you!');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setFile(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setMessage(message || errorMessage?.text || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-3'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <Input id='firstName' required value={firstName} onChange={(e) => setFirstName(e.target.value)} title={firstNameLabel?.text || 'First name'} />
        <Input id='lastName' required value={lastName} onChange={(e) => setLastName(e.target.value)} title={lastNameLabel?.text || 'Last name'} />
      </div>
      <Input id='email' required type='email' value={email} onChange={(e) => setEmail(e.target.value)} title={emailLabel?.text || 'Email address'} />
      <Input id='phone' type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} title={phoneLabel?.text || 'Phone (optional)'} />
      <div>
        <label className='block text-sm font-medium mb-1'>
          {resumeLabel?.text || 'Resume / CV'}
          <span className='text-red-500' aria-hidden>
            {' '}*
          </span>
        </label>
        <div className='flex items-center gap-3'>
          <Button
            type='button'
            variant='secondary'
            size='sm'
            className='relative'
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex items-center gap-2">
              <svg className='mr-2' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M16 16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6' /><polyline points='15 3 21 3 21 9' /><line x1='10' y1='14' x2='21' y2='3' /></svg>
              {file ? (changeFileText?.text || 'Change file') : (browseText?.text || 'Browse')}
            </div>
          </Button>
          <input
            ref={fileInputRef}
            className="hidden"
            type='file'
            accept='.pdf,.doc,.docx'
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            style={{ display: 'none' }}
          />
          {file && <span className='text-xs text-muted-foreground truncate max-w-[180px]'>{file.name}</span>}
        </div>
      </div>
      <div>
        <Button type='submit' isLoading={isSubmitting} disabled={isSubmitting}>{submitText?.text || 'Submit Application'}</Button>
      </div>
      {message && <p className='text-sm mt-2'>{message}</p>}
    </form>
  )
}
