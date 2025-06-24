'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import * as Yup from 'yup'
import useRegistrationCheck from '@/hooks/useRegistrationCheck'
import CalendlyEmbed from '@/components/CalendlyEmbed'
import { callZapierWebhook } from '@/lib/zapier'
import { ZapierConsultationPayload } from '@/types/main'
import { CountryDropdown, Country } from '@/components/ui/country-dropdonw'
import { countries } from 'country-data-list'
import { useParams } from 'next/navigation'
import { interestedInOptions, budgetOptions, periodOptions, languageOptions, messageOptions } from '@/lib/options'
import { StorageKey } from '@/lib/storage.util'
import storage from '@/lib/storage.util'
import { useMutation } from '@tanstack/react-query'
import router from 'next/router'
import { getUserInfo, persistUserInfo } from '@/lib/services/user.service'
import useTranslations from '@/hooks/useTranslations'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  country: Country | null
  interestedIn: string[]
  message: string
  language: string
  budget: string
  period: string
  clickID: string
  showMessage: string
}

export default function ConsultationForm() {

  const baseCalendlyUrl = 'https://calendly.com/rabihrabea/appointmentbooking?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=D6A319'

  const { lang } = useParams()
  const userInfo = getUserInfo();
  const [calendlyUrl, setCalendlyUrl] = useState('');

  const t = useTranslations();

  const { isRegistered } = useRegistrationCheck();

  const [step, setStep] = useState(0);

  const makeConversion = async () => {
    if (values.clickID) return;
    try {
      const response = await fetch('/api/meta/conversions', {
        method: 'POST',
        body: JSON.stringify({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to make conversion');
      }
      const data = await response.json();
      const clickID = data.data.clickID;
      setFieldValue('clickID', clickID);
      storage.set(StorageKey.CLICK_ID, clickID, { expiration: 1000 * 60 * 60 * 24 * 30 })
    } catch (error) {
      console.error('Error making conversion:', error);
      // Continue with the form submission even if conversion fails
    }
  }

  const alpha2 = lang !== 'en' ? lang : 'de'
  const initialCountry = countries.all.find(country => country.alpha2.toLowerCase() === alpha2)
  const initialLanguage = languageOptions.find(option => option.value.toLowerCase() === lang)

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const payload: ZapierConsultationPayload = {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          clickID: values.clickID,
          type: 'consultation',
          consultationInfo: {
            country: values.country?.name || '',
            interestedIn: values.interestedIn,
            budget: values.budget,
            period: values.period,
            language: languageOptions.find(option => option.value === values.language)?.label || 'English',
          }
        }
        await callZapierWebhook(payload)
      } catch (error) {
        console.error('Error calling Zapier webhook:', error);
      }
    },
    onSuccess: () => {
      storage.set(StorageKey.BOOKED_CONSULTATION, true, { expiration: 1000 * 60 * 60 * 24 * 30 })
      storage.remove(StorageKey.CLICK_ID)
      router.push('/consultation/thank-you');
    }
  })

  const { values, setFieldValue, handleChange, handleSubmit } = useFormik<FormValues>({
    initialValues: {
      firstName: userInfo?.firstName || '',
      lastName: userInfo?.lastName || '',
      email: userInfo?.email || '',
      phoneNumber: userInfo?.phoneNumber || '',
      country: initialCountry || null,
      interestedIn: [],
      budget: '',
      period: '',
      message: '',
      showMessage: 'No',
      language: initialLanguage?.value || 'en',
      clickID: storage.get(StorageKey.CLICK_ID) || '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phoneNumber: Yup.string(),
    }),
    onSubmit: () => {
      const link = generateCalendlyPrefilledUrl();
      persistUserInfo({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
      });
      setCalendlyUrl(link);
      mutate()
    }
  })

  const generateCalendlyPrefilledUrl = () => {
    const url = new URL(baseCalendlyUrl)
    url.searchParams.set('first_name', values.firstName)
    url.searchParams.set('last_name', values.lastName)
    url.searchParams.set('email', values.email)
    const compiledAnswers = [
      values.country ? `Country:-${values.country}` : null,
      values.interestedIn.length > 0 ? `Interested in:-${values.interestedIn.join(', ')}` : null,
      values.budget ? `Budget:-${values.budget}` : null,
      values.period ? `Period:-${values.period}` : null,
      values.language ? `Language:-${values.language}` : null,
      values.message ? `Message:-${values.message}` : null
    ].filter(Boolean).join(';')
    url.searchParams.set('a1', `********PLEASE-DO-NOT-CHANGE-THIS: ${compiledAnswers}********`)
    return url.toString()
  }

  const handleInterestedInChange = (option: string) => {
    if (values.interestedIn.includes(option)) {
      setFieldValue('interestedIn', values.interestedIn.filter(o => o !== option))
    } else {
      setFieldValue('interestedIn', [...values.interestedIn, option])
    }
  }

  const goToNextStep = () => {
    if (step === 0) {
      makeConversion()
    }
    setStep(step + 1)
  }

  const steps = [
    {
      label: 'My preferred language is ...',
      component: (
        <div className='flex flex-col gap-10'>
          <Select name='language' value={values.language} onValueChange={(value) => setFieldValue('language', value)}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select language' />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option, index) => (
                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className='flex flex-col gap-2'>
            <p className='text-lg font-medium'>I am currently living in ...</p>
            <CountryDropdown
              defaultValue={values.country?.alpha3}
              onChange={(value) => setFieldValue('country', value)}
            />
          </div>
        </div>
      )
    },
    {
      label: 'I am interested in ...',
      component: <div className='flex flex-col gap-2 mt-2'>
        {interestedInOptions.map((option, index) => (
          <div className='flex items-center gap-2' key={index}>
            <Checkbox id={option} checked={values.interestedIn.includes(option)} onClick={() => handleInterestedInChange(option)} />
            <label className='text-lg cursor-pointer' htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    },
    {
      label: 'I am planning to buy ...',
      component:
        <RadioGroup name='period' value={values.period} className='mt-3'>
          <div className='grid grid-cols-2 grid-rows-4 gap-3'>
            {periodOptions.map((option, index) => (
              <div className='flex items-center gap-2' key={index}>
                <RadioGroupItem id={option} value={option} checked={values.period === option} onClick={() => setFieldValue('period', option)} />
                <label className='text-lg cursor-pointer' htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </RadioGroup>
    },
    {
      // label: 'My name is ...',
      component: <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <Input name='firstName' title='First name' required value={values.firstName} onChange={handleChange} placeholder='John' />
          <Input name='lastName' title='Last name' required value={values.lastName} onChange={handleChange} placeholder='Doe' />
        </div>
        <Input name='email' title='Email Address' required value={values.email} onChange={handleChange} placeholder='john.doe@example.com' />
        <Input name='phoneNumber' title='Phone Number' value={values.phoneNumber} onChange={handleChange} placeholder='+905555555555' />
      </div>
    },
    {
      label: 'My ideal budget range is ...',
      component:
        <RadioGroup name='budget' value={values.budget}>
          <div className='grid grid-cols-2 grid-rows-4 gap-2'>
            {budgetOptions.map((option, index) => (
              <div className='flex items-center gap-2' key={index}>
                <RadioGroupItem id={option} value={option} checked={values.budget === option} onClick={() => setFieldValue('budget', option)} />
                <label className='text-lg cursor-pointer' htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </RadioGroup>
    },
    {
      label: 'Is there anything else you would like us to know before our meeting?',
      component: <div className='flex flex-col gap-2'>
        <RadioGroup name='showMessage' value={values.showMessage}>
          <div className='grid grid-cols-2 gap-2'>
            {messageOptions.map((option, index) => (
              <div className='flex items-center gap-2' key={index}>
                <RadioGroupItem id={option} value={option} checked={values.showMessage === option} onClick={() => setFieldValue('showMessage', option)} />
                <label className='text-lg cursor-pointer' htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </RadioGroup>
        {values.showMessage === 'Yes' && <Textarea name='message' rows={6} value={values.message} onChange={handleChange} placeholder='For example: I am looking for a property in Istanbul, I am a first time buyer, etc.' />}
      </div>
    },
  ]

  const isDisabled = (step: number) => {
    const validations = {
      // 0: !values.firstName || !values.lastName || !!errors.email,
      // 1: !values.country,
      // 2: values.interestedIn.length === 0,
      // 3: !values.budget,
      // 4: !values.period,
      // 5: !values.language
    };

    return validations[step as keyof typeof validations] ?? false;
  }

  if (isRegistered) {
    return <div className='flex flex-col gap-4 justify-center items-center min-h-[20vh] w-full p-8 transition-all duration-300'>
      <h4 className='text-2xl font-medium text-center'>Thank you for your interest in our services!</h4>
      <p className='text-lg text-center'>We will schedule a consultation with you soon.</p>
    </div>
  }

  if (calendlyUrl) {
    return <CalendlyEmbed url={calendlyUrl} />
  }

  return (
    <form className='flex flex-col gap-4 justify-between min-h-[50vh] md:min-h-[45vh] overflow-y-auto w-full p-8 transition-all duration-300'>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          {steps.map((_, index) => (
            <div key={index} className={`w-full h-1 rounded-full ${step === index ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>
        {/* <h4 className='text-2xl font-medium'>Before you get started, please answer these questions.</h4> */}
        <div className="flex flex-col gap-6">
          {steps[step].label && <h4 className='text-3xl font-medium'>{t(steps[step].label)}</h4>}
          {steps[step].component}
        </div>
      </div>
      <div className="flex gap-4 justify-between overflow-hidden">
        {step > 0 && (
          <Button type='button' variant='outline' className='w-full shrink text-gray-500' onClick={() => setStep(step - 1)}>Back</Button>
        )}
        {step < steps.length - 1 && (
          <Button type='button' className='w-full shrink' onClick={goToNextStep} disabled={isDisabled(step)}>Next</Button>
        )}
        {step === steps.length - 1 && (
          <Button type='submit' isLoading={isPending} onClick={() => handleSubmit()} disabled={isDisabled(step) || isPending} className='w-full shrink'>Submit</Button>
        )}
      </div>
    </form>
  )
}
