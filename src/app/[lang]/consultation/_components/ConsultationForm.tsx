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

type FormValues = {
  firstName: string
  lastName: string
  email: string
  country: string
  interestedIn: string[]
  message: string
  language: string
  budget: string
  period: string
}

export default function ConsultationForm() {

  const baseCalendlyUrl = 'https://calendly.com/rabihrabea/appointmentbooking?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=D6A319'

  const [calendlyUrl, setCalendlyUrl] = useState('')

  const { isRegistered } = useRegistrationCheck();

  const [step, setStep] = useState(0);

  const { values, errors, setFieldValue, handleChange, handleSubmit } = useFormik<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      interestedIn: [],
      budget: '',
      period: '',
      message: '',
      language: '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: () => {
      const link = generateCalendlyPrefilledUrl()
      setCalendlyUrl(link);
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

  const interestedInOptions = [
    'Investment property',
    'Vacation / Second home',
    'Relocation or retirement',
    'I\'m just browsing'
  ]

  const budgetOptions = [
    '<€60,000',
    '€60,000–€100,000',
    '€100,000–€200,000',
    '€200,000-€400,000',
    '€400,000-€1,000,000',
    '€1,000,000+',
    'Not sure',
    "I'd rather not say"
  ]

  const periodOptions = [
    'As soon as possible',
    'In the next 1–3 months',
    '3–6 months',
    '6 - 12 months',
    'More than 12 months',
    'Just exploring for now',
  ]

  const languageOptions = [
    'English',
    'German',
    'Turkish',
  ]

  const steps = [
    {
      label: 'Let\'s get to know you',
      component: <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <Input name='firstName' title='First name' required value={values.firstName} onChange={handleChange} placeholder='John' />
          <Input name='lastName' title='Last name' required value={values.lastName} onChange={handleChange} placeholder='Doe' />
        </div>
        <Input name='email' title='Email Address' required value={values.email} onChange={handleChange} placeholder='john.doe@example.com' />
      </div>
    },
    {
      label: 'What country are you currently living in?',
      component: <Input name='country' required value={values.country} onChange={handleChange} placeholder='Germany, Turkey, etc.' />
    },
    {
      label: 'What are you interested in?',
      component: <div className='flex flex-col gap-2'>
        {interestedInOptions.map((option, index) => (
          <div className='flex items-center gap-2' key={index}>
            <Checkbox id={option} checked={values.interestedIn.includes(option)} onClick={() => handleInterestedInChange(option)} />
            <label className='text-sm cursor-pointer' htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
    },
    {
      label: 'What is your ideal budget range?',
      component:
        <RadioGroup name='budget' value={values.budget}>
          <div className='grid grid-cols-2 grid-rows-4 gap-2'>
            {budgetOptions.map((option, index) => (
              <div className='flex items-center gap-2' key={index}>
                <RadioGroupItem id={option} value={option} checked={values.budget === option} onClick={() => setFieldValue('budget', option)} />
                <label className='text-sm cursor-pointer' htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </RadioGroup>
    },
    {
      label: 'When are you planning to buy?',
      component:
        <RadioGroup name='period' value={values.period}>
          <div className='grid grid-cols-2 grid-rows-4 gap-2'>
            {periodOptions.map((option, index) => (
              <div className='flex items-center gap-2' key={index}>
                <RadioGroupItem id={option} value={option} checked={values.period === option} onClick={() => setFieldValue('period', option)} />
                <label className='text-sm cursor-pointer' htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </RadioGroup>
    },
    {
      label: 'Is there anything else you would like us to know before we contact you?',
      component: <Textarea name='message' value={values.message} onChange={handleChange} placeholder='I am looking for a property in Istanbul, I am a first time buyer, etc.' />
    },
    {
      label: 'What is your preferred language?',
      component: <Select name='language' value={values.language} onValueChange={(value) => setFieldValue('language', value)}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select language' />
        </SelectTrigger>
        <SelectContent>
          {languageOptions.map((option, index) => (
            <SelectItem key={index} value={option}>{option}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    }
  ]

  const isDisabled = (step: number) => {
    const validations = {
      0: !values.firstName || !values.lastName || !!errors.email,

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
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <div key={index} className={`w-full h-1 rounded-full ${step === index ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>
          <h4 className='text-2xl font-medium'>Before you get started, please answer these questions.</h4>
        </div>
        <div className="flex flex-col gap-4">
          <p className='text-xl font-medium'>{steps[step].label}</p>
          {steps[step].component}
        </div>
      </div>
      <div className="flex gap-4 justify-between overflow-hidden">
        {step > 0 && (
          <Button type='button' variant='outline' className='w-full shrink text-gray-500' onClick={() => setStep(step - 1)}>Back</Button>
        )}
        {step < steps.length - 1 && (
          <Button type='button' className='w-full shrink' onClick={() => setStep(step + 1)} disabled={isDisabled(step)}>Next</Button>
        )}
        {step === steps.length - 1 && (
          <Button type='submit' onClick={() => handleSubmit()} disabled={isDisabled(step)} className='w-full shrink'>Submit</Button>
        )}
      </div>
    </form>
  )
}
