'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ApplicationForm({ jobId }: { jobId: string }) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const fd = new FormData();
      fd.append('firstName', firstName);
      fd.append('lastName', lastName);
      fd.append('email', email);
      if (phone) fd.append('phone', phone);
      if (file) fd.append('file', file);
      fd.append('jobId', jobId);

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) throw new Error('Submission failed');
      await res.json();
      setMessage('Application submitted. Thank you!');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setFile(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setMessage(message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-3'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <Input id='firstName' required value={firstName} onChange={(e) => setFirstName(e.target.value)} title='First name' />
        <Input id='lastName' required value={lastName} onChange={(e) => setLastName(e.target.value)} title='Last name' />
      </div>
      <Input id='email' required type='email' value={email} onChange={(e) => setEmail(e.target.value)} title='Email address' />
      <Input id='phone' type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} title='Phone (optional)' />
      <div>
        <label className='block text-sm font-medium mb-1'>Resume / CV</label>
        <div className='flex items-center gap-3'>
          <Button
            type='button'
            variant='secondary'
            size='sm'
            className='relative'
            onClick={() => fileInputRef.current?.click()}
          >
            <svg className='mr-2' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M16 16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6'/><polyline points='15 3 21 3 21 9'/><line x1='10' y1='14' x2='21' y2='3'/></svg>
            {file ? 'Change file' : 'Browse'}
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
        <Button type='submit' isLoading={isSubmitting}>Submit Application</Button>
      </div>
      {message && <p className='text-sm mt-2'>{message}</p>}
    </form>
  )
}
