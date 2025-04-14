'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ConsultationForm() {
  const [step, setStep] = useState(0)
  const { values, setFieldValue, handleChange, handleSubmit } = useFormik<{
    country: string
    interestedIn: string[]
    budget: string
    period: string
    message: string
    language: string
  }>({
    initialValues: {
      country: '',
      interestedIn: [],
      budget: '',
      period: '',
      message: '',
      language: '',
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

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

  const handleInterestedInChange = (option: string) => {
    if (values.interestedIn.includes(option)) {
      setFieldValue('interestedIn', values.interestedIn.filter(o => o !== option))
    } else {
      setFieldValue('interestedIn', [...values.interestedIn, option])
    }
  }

  const steps = [
    {
      label: 'What country are you currently living in?',
      component: <Input name='country' required value={values.country} onChange={handleChange} placeholder='eg. Germany, Turkey, etc.' />
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
        <RadioGroup name='budget' value={values.budget} onChange={handleChange}>
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
      component: <RadioGroup name='period' value={values.period} onChange={handleChange}>
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
      component: <Textarea name='message' value={values.message} onChange={handleChange} placeholder='eg. I am looking for a property in Istanbul, I am a first time buyer, etc.' />
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
      0: !values.country,
      1: values.interestedIn.length === 0,
      2: !values.budget,
      3: !values.period,
      5: !values.language
    };

    return validations[step as keyof typeof validations] ?? false;
  }

  return (
    <form className='flex flex-col gap-4 h-full justify-between md:min-h-[35vh] overflow-y-auto w-full p-8' onSubmit={handleSubmit}>
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
          <Button type='button' className='w-full shrink' onClick={() => setStep(step - 1)}>Back</Button>
        )}
        {step < steps.length - 1 && (
          <Button type='button' className='w-full shrink' onClick={() => setStep(step + 1)} disabled={isDisabled(step)}>Next</Button>
        )}
        {step === steps.length - 1 && (
          <Button type='submit' disabled={isDisabled(step)} className='w-full shrink'>Submit</Button>
        )}
      </div>
    </form>
  )
}
