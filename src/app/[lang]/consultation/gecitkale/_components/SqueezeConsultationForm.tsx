'use client'

import { useFormik } from 'formik'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import * as Yup from 'yup'
import { ContactInfo } from '@/types/main'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useMutation } from '@tanstack/react-query'
import { persistUserInfo } from '@/lib/services/user.service'
import useUserInfo from '@/hooks/useUserInfo'
import { ConsultationRegistrationRequest } from '@/types/webinar.type'
import { makePOSTRequest } from '@/lib/services/api.service'
import { Locale } from '@/lib/i18n-config'
import CalendlyEmbed from '@/components/CalendlyEmbed'
import { useState } from 'react'

const PhoneInput = dynamic(() => import('@/components/ui/phone-input').then(mod => mod.PhoneInput), {
  loading: () => <Input placeholder="Loading..." />
})

type FormValues = ContactInfo & {
  language: Locale
  interestReason: string
  interestReasonOther: string
  investmentTimeline: string
}

type SqueezeConsultationFormProps = {
  translations: {
    formTitle: string
    form: {
      firstName: string
      lastName: string
      email: string
      phoneNumber: string
    }
    headers: {
      interestReason: string
      investmentTimeline: string
    }
    options: {
      interestReasons: { label: string, value: string }[]
      investmentTimelines: { label: string, value: string }[]
    }
    placeholders: {
      interestReasonOther: string
    }
    buttons: {
      submitButton: string
    }
  }
}

export default function SqueezeConsultationForm({ translations }: SqueezeConsultationFormProps) {
  const { lang } = useParams()
  const userInfo = useUserInfo()

  const baseCalendlyUrl = 'https://calendly.com/rabihrabea/appointmentbooking?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=D6A319'
  const [calendlyUrl, setCalendlyUrl] = useState<string | null>(null)

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const contactInfo = values
      const payload: ConsultationRegistrationRequest = {
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        email: contactInfo.email,
        phone: contactInfo.phoneNumber,
        language: values.language,
        utmInfo: {
          utmSource: contactInfo.utm.source,
          utmMedium: contactInfo.utm.medium,
          utmCampaign: contactInfo.utm.campaign,
          utmTerm: contactInfo.utm.term,
          utmContent: contactInfo.utm.content,
        },
        period: values.investmentTimeline,
        interestedIn: [values.interestReason, values.interestReasonOther].filter(Boolean),
      }
      await makePOSTRequest('/registration/consultation', payload)
      persistUserInfo({
        ...contactInfo,
        language: values.language,
      })
    }
  })

  const { values, setFieldValue, handleChange, handleSubmit, errors, touched } = useFormik<FormValues>({
    initialValues: {
      ...userInfo,
      language: lang as Locale || 'en',
      interestReason: '',
      interestReasonOther: '',
      investmentTimeline: '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phoneNumber: Yup.string(),
      interestReason: Yup.string().required('Please select an interest reason'),
      interestReasonOther: Yup.string().when('interestReason', {
        is: 'other',
        then: (schema) => schema.required('Please specify your reason'),
        otherwise: (schema) => schema.notRequired(),
      }),
      investmentTimeline: Yup.string().required('Please select a timeline'),
    }),
    onSubmit: async () => {
      const link = generateCalendlyPrefilledUrl();
      setCalendlyUrl(link);
      mutate()
    }
  })

  const isFormValid = values.firstName && values.lastName && values.email
    && values.interestReason && values.investmentTimeline
    && (values.interestReason !== 'other' || values.interestReasonOther)

  const generateCalendlyPrefilledUrl = () => {
    const url = new URL(baseCalendlyUrl)
    url.searchParams.set('first_name', values.firstName)
    url.searchParams.set('last_name', values.lastName)
    url.searchParams.set('email', values.email)
    url.searchParams.set('a1', values.phoneNumber)
    url.searchParams.set('a3', values.interestReason)
    return url.toString()
  }

  if (calendlyUrl) {
    return <CalendlyEmbed url={calendlyUrl} />
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full max-w-lg p-8 bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold text-center'>{translations.formTitle}</h2>

        <div className='grid grid-cols-2 gap-4'>
          <Input
            name='firstName'
            title={translations.form.firstName}
            required
            value={values.firstName}
            onChange={handleChange}
            placeholder='John'
          />
          <Input
            name='lastName'
            title={translations.form.lastName}
            required
            value={values.lastName}
            onChange={handleChange}
            placeholder='Doe'
          />
        </div>

        <Input
          name='email'
          title={translations.form.email}
          required
          value={values.email}
          onChange={handleChange}
          placeholder='john.doe@example.com'
        />

        <PhoneInput
          name='phoneNumber'
          title={translations.form.phoneNumber}
          value={values.phoneNumber}
          onChange={(value) => setFieldValue('phoneNumber', value)}
          placeholder='+905555555555'
        />

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium'>{translations.headers.interestReason}</label>
          <Select
            name='interestReason'
            value={values.interestReason}
            onValueChange={(value) => setFieldValue('interestReason', value)}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder="Choose one" />
            </SelectTrigger>
            <SelectContent>
              {translations.options.interestReasons.map((option, index) => (
                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {values.interestReason === 'other' && (
          <Input
            name='interestReasonOther'
            value={values.interestReasonOther}
            onChange={handleChange}
            placeholder={translations.placeholders.interestReasonOther}
          />
        )}

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium'>{translations.headers.investmentTimeline}</label>
          <Select
            name='investmentTimeline'
            value={values.investmentTimeline}
            onValueChange={(value) => setFieldValue('investmentTimeline', value)}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder="Choose one" />
            </SelectTrigger>
            <SelectContent>
              {translations.options.investmentTimelines.map((option, index) => (
                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type='submit'
        isLoading={isPending}
        disabled={!isFormValid || isPending}
        className='w-full'
      >
        {translations.buttons.submitButton}
      </Button>
    </form>
  )
}
