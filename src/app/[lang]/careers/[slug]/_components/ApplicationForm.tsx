'use client'

import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useTranslation from '@/hooks/useTranslation';
import { Locale } from '@/lib/i18n-config'
import { careersContent } from '@/lib/content/careers';
import { FileInput } from '@/components/ui/file-input'
import { makePOSTRequest } from '@/lib/services/api.service'

type FormValues = {
  listingId: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  resumeUrl: string,
}

type JobApplicationRequest = {
  listingId: number,
  name: string,
  email: string,
  phone?: string,
  resumeUrl?: string,
}

type ApplicationFormProps = {
  jobId: string
  lang: Locale
}

export default function ApplicationForm({ jobId, lang }: ApplicationFormProps) {
  const content = careersContent[lang] ?? careersContent.en;
  // Translation hooks
  const { data: resumeRequiredError } = useTranslation('Please upload your resume/CV');
  const { data: successMessage } = useTranslation('Application submitted. Thank you!');
  const { data: errorMessage } = useTranslation('An error occurred');

  const { mutate: submitApplication, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (values: FormValues) => {
      const payload: JobApplicationRequest = {
        listingId: values.listingId,
        name: `${values.firstName} ${values.lastName}`.trim(),
        email: values.email,
        phone: values.phone ?? undefined,
        resumeUrl: values.resumeUrl,
      }
      makePOSTRequest('/job-applications', payload)
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue, resetForm } = useFormik<FormValues>({
    initialValues: {
      listingId: Number(jobId),
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      resumeUrl: '',
    },
    validationSchema: Yup.object({
      listingId: Yup.number().required('Listing ID is required'),
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string(),
      resumeUrl: Yup.string().required(resumeRequiredError?.text || 'Please upload your resume/CV')
    }),
    onSubmit: (values) => {
      submitApplication(values, {
        onSuccess: () => {
          resetForm();
        },
      });
    },
  });

  const message = isSuccess
    ? (successMessage?.text || 'Application submitted. Thank you!')
    : isError
      ? (error instanceof Error ? error.message : errorMessage?.text || 'An error occurred')
      : null;

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <div>
          <Input
            id='firstName'
            required
            value={values.firstName}
            onChange={handleChange}
            title={content.applicationForm.firstName}
            aria-invalid={touched.firstName && !!errors.firstName}
          />
          {touched.firstName && errors.firstName && (
            <p className='text-sm text-red-500 mt-1'>{errors.firstName}</p>
          )}
        </div>
        <div>
          <Input
            id='lastName'
            required
            value={values.lastName}
            onChange={handleChange}
            title={content.applicationForm.lastName}
            aria-invalid={touched.lastName && !!errors.lastName}
          />
          {touched.lastName && errors.lastName && (
            <p className='text-sm text-red-500 mt-1'>{errors.lastName}</p>
          )}
        </div>
      </div>
      <div>
        <Input
          id='email'
          required
          type='email'
          value={values.email}
          onChange={handleChange}
          title={content.applicationForm.email}
          aria-invalid={touched.email && !!errors.email}
        />
        {touched.email && errors.email && (
          <p className='text-sm text-red-500 mt-1'>{errors.email}</p>
        )}
      </div>
      <div>
        <Input
          id='phone'
          type='tel'
          value={values.phone}
          onChange={handleChange}
          title={content.applicationForm.phone}
          aria-invalid={touched.phone && !!errors.phone}
        />
        {touched.phone && errors.phone && (
          <p className='text-sm text-red-500 mt-1'>{errors.phone}</p>
        )}
      </div>
      <FileInput
        accept=".pdf,.doc,.docx"
        required
        name='resumeUrl'
        fileValue={values.resumeUrl}
        title={content.applicationForm.resume}
        folderName='resumes'
        onUpload={(value) => {
          setFieldValue('resumeUrl', value);
        }}
        onUploadComplete={(result) => {
          setFieldValue('resumeUrl', result.url);
        }}
        onError={() => {
          setFieldValue('resumeUrl', '');
        }}
        error={touched.resumeUrl ? errors.resumeUrl : undefined}
        disabled={isPending}
      />
      <Button type='submit' size='sm' className='mt-4 max-w-80 h-10' isLoading={isPending} disabled={isPending}>
        {content.submitApplication}
      </Button>
      {message && (
        <p className={`text-sm mt-2 ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </form>
  )
}
