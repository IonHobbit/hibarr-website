'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import { Textarea } from '@/components/ui/textarea'
import useTranslation from '@/hooks/useTranslation'
import useUserInfo from '@/hooks/useUserInfo'
import { persistUserInfo } from '@/lib/services/user.service'
import { callZapierWebhook } from '@/lib/zapier'
import { ZapierPropertyEnquiryPayload } from '@/types/main'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import Link from 'next/link'
import { Fragment } from 'react'
import * as Yup from 'yup'

type EnquiryFormProps = {
  propertyId: string
}

export default function EnquiryForm({ propertyId }: EnquiryFormProps) {
  const userInfo = useUserInfo();

  const { data: interestedInThisPropertyTranslation } = useTranslation('Interested in this property?');
  const { data: fillOutTheFormBelowToGetMoreInformationTranslation } = useTranslation('Fill out the form below to get more information');
  const { data: joinFacebookGroupTranslation } = useTranslation('Join our Facebook Group');
  const { data: thankYouTranslation } = useTranslation('Thank you for reaching out!');
  const { data: weWillGetBackToYouTranslation } = useTranslation('We will get back to you as soon as possible');
  const { data: inTheMeantimeTranslation } = useTranslation('In the meantime, join our Facebook Group to stay updated on the smartest ways to buy property');
  const { data: makeEnquiryTranslation } = useTranslation('Make Enquiry');

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: async () => {
      const contactInfo = values;
      const payload: ZapierPropertyEnquiryPayload = {
        ...contactInfo,
        comment: values.comment,
        type: 'property-enquiry',
        propertyId,
      }

      // persist user info to storage
      persistUserInfo(contactInfo);

      await callZapierWebhook(payload)
    }
  })

  const { values, errors, touched, setFieldTouched, handleChange, handleSubmit } = useFormik<ZapierPropertyEnquiryPayload>({
    initialValues: {
      ...userInfo,
      comment: '',
      type: 'property-enquiry',
      propertyId,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address, please enter a valid email address').required('Email is required'),
      phoneNumber: Yup.string().matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number, please use international format (+491234567890)'),
      comment: Yup.string()
    }),
    onSubmit: () => mutate()
  })

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit()
  }

  return (
    <form onSubmit={submitForm} className="sticky top-20 bg-secondary rounded-lg p-6 flex flex-col gap-4">
      {isSuccess ? (
        <div className='flex flex-col gap-2'>
          <h4 className='text-xl font-medium'>{thankYouTranslation?.text || 'Thank you for reaching out!'}</h4>
          <p className='text-sm text-muted-foreground'>{weWillGetBackToYouTranslation?.text || 'We will get back to you as soon as possible'}</p>
          <p className='text-sm text-muted-foreground'>{inTheMeantimeTranslation?.text || 'In the meantime, join our Facebook Group to stay updated on the smartest ways to buy property'}</p>
          <Button asChild className='mt-4'>
            <Link href="/facebook-group">
              {joinFacebookGroupTranslation?.text || 'Join our Facebook Group'}
            </Link>
          </Button>
        </div>
      ) : (
        <Fragment>
          <p className='text-xl font-medium'>{interestedInThisPropertyTranslation?.text || 'Interested in this property?'}</p>
          <p className='text-sm text-muted-foreground'>{fillOutTheFormBelowToGetMoreInformationTranslation?.text || 'Fill out the form below to get more information'}</p>
          <div className="flex flex-col gap-2">
            <Input type='text' required placeholder='First Name' name='firstName'
              error={errors.firstName && touched.firstName ? errors.firstName : undefined}
              value={values.firstName}
              onChange={handleChange}
              onBlur={() => setFieldTouched('firstName', true)}
            />
            <Input type='text' required placeholder='Last Name' name='lastName'
              error={errors.lastName && touched.lastName ? errors.lastName : undefined}
              value={values.lastName}
              onChange={handleChange}
              onBlur={() => setFieldTouched('lastName', true)}
            />
            <Input type='email' required placeholder='Email' name='email'
              error={errors.email && touched.email ? errors.email : undefined}
              value={values.email}
              onChange={handleChange}
              onBlur={() => setFieldTouched('email', true)}
            />
            <PhoneInput name='phoneNumber'
              error={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : undefined}
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={() => setFieldTouched('phoneNumber', true)}
            />
            <Textarea placeholder='Comment' name='comment'
              value={values.comment}
              onChange={handleChange}
              onBlur={() => setFieldTouched('comment', true)}
            />
          </div>
          <Button type='submit' isLoading={isPending} className='w-full' variant='accent'>
            {makeEnquiryTranslation?.text || 'Make Enquiry'}
          </Button>
        </Fragment>
      )}
    </form>
  )
}
