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
import { gecitkaleConsultationContent } from '@/lib/content/gecitkale-consultation'
import { Checkbox } from '@/components/ui/checkbox'

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
  nonce?: string
}

export default function SqueezeConsultationForm({ nonce }: SqueezeConsultationFormProps) {
  const { lang } = useParams();
  const userInfo = useUserInfo();

  const [agreedToDataPrivacy, setAgreedToDataPrivacy] = useState(false);

  const content = gecitkaleConsultationContent[lang as Locale] ?? gecitkaleConsultationContent.en;

  const baseCalendlyUrl = 'https://calendly.com/rabihrabea/customer-kick-off-meeting?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=D6A319'
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

  const { values, setFieldValue, handleChange, handleSubmit } = useFormik<FormValues>({
    initialValues: {
      ...userInfo,
      language: lang as Locale || 'en',
      interestReason: '',
      interestReasonOther: '',
      investmentTimeline: '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(content.form.validationMessages.firstName),
      lastName: Yup.string().required(content.form.validationMessages.lastName),
      email: Yup.string().email(content.form.validationMessages.emailInvalid).required(content.form.validationMessages.email),
      phoneNumber: Yup.string().required(content.form.validationMessages.phoneNumber),
      interestReason: Yup.string().required(content.form.validationMessages.interestReason),
      interestReasonOther: Yup.string().when('interestReason', {
        is: 'other',
        then: (schema) => schema.required(content.form.validationMessages.interestReasonOther),
        otherwise: (schema) => schema.notRequired(),
      }),
      investmentTimeline: Yup.string().required(content.form.validationMessages.investmentTimeline),
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
    url.searchParams.set('a2', `Interest reason: ${values.interestReason} ${values.interestReasonOther ? `Other: ${values.interestReasonOther}` : ''} ${values.investmentTimeline ? `Investment timeline: ${values.investmentTimeline}` : ''}`)
    return url.toString()
  }

  if (calendlyUrl) {
    return <CalendlyEmbed url={calendlyUrl} nonce={nonce} />
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full p-6 md:p-8 rounded-lg'>
      <div className='flex flex-col gap-4'>
        <div className="flex flex-col gap-2">
          <h2 className='text-2xl font-bold text-center'>{content.form.title}</h2>
          <p className='text-sm text-center'>{content.form.subtitle}</p>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <Input
            name='firstName'
            title={content.form.fields.firstName}
            required
            value={values.firstName}
            onChange={handleChange}
            placeholder='John'
          />
          <Input
            name='lastName'
            title={content.form.fields.lastName}
            required
            value={values.lastName}
            onChange={handleChange}
            placeholder='Doe'
          />
        </div>

        <Input
          name='email'
          title={content.form.fields.email}
          required
          value={values.email}
          onChange={handleChange}
          placeholder='john.doe@example.com'
        />

        <PhoneInput
          name='phoneNumber'
          required
          title={content.form.fields.phoneNumber}
          value={values.phoneNumber}
          onChange={(value) => setFieldValue('phoneNumber', value)}
          placeholder='+905555555555'
        />

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium'>{content.form.fields.interestReason}</label>
          <Select
            name='interestReason'
            value={values.interestReason}
            onValueChange={(value) => setFieldValue('interestReason', value)}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={content.form.placeholders.chooseOne} />
            </SelectTrigger>
            <SelectContent>
              {content.form.options.interestReasons.map((option, index) => (
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
            placeholder={content.form.placeholders.interestReasonOther}
          />
        )}

        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium'>{content.form.fields.investmentTimeline}</label>
          <Select
            name='investmentTimeline'
            value={values.investmentTimeline}
            onValueChange={(value) => setFieldValue('investmentTimeline', value)}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={content.form.placeholders.chooseOne} />
            </SelectTrigger>
            <SelectContent>
              {content.form.options.investmentTimelines.map((option, index) => (
                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          required
          id='dataPrivacy'
          name='dataPrivacy'
          checked={agreedToDataPrivacy}
          onCheckedChange={() => setAgreedToDataPrivacy(!agreedToDataPrivacy)}
        />
        <label htmlFor="dataPrivacy" className="text-sm cursor-pointer">{content.form.dataPrivacy}</label>
      </div>

      <Button
        type='submit'
        size='lg'
        variant='accent'
        isLoading={isPending}
        disabled={!isFormValid || isPending || !agreedToDataPrivacy}
        className='w-full'
      >
        {content.form.submitButton}
      </Button>
    </form>
  )
}
