'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useFormik } from 'formik'

export default function ConsultationForm() {
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
    'Vacation / second home',
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

  return (
    <form className='flex flex-col gap-4 h-full max-h-[40vh] overflow-y-auto w-full p-8' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>What country are you currently living in?</p>
        <Input name='country' required value={values.country} onChange={handleChange} placeholder='eg. Germany, Turkey, etc.' />
      </div>
      <div className="flex flex-col gap-4">
        <p className='text-sm'>What are you interested in?</p>
        <div className='flex flex-col gap-2'>
          {interestedInOptions.map((option, index) => (
            <div className='flex items-center gap-2' key={index}>
              <Checkbox id={option} checked={values.interestedIn.includes(option)} onClick={() => handleInterestedInChange(option)} />
              <label className='text-sm cursor-pointer' htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className='text-sm'>What is your ideal budget range?</p>
        <RadioGroup name='budget' value={values.budget} onChange={handleChange}>
          <div className='grid grid-cols-2 grid-rows-4 gap-2'>
            {budgetOptions.map((option, index) => (
              <div className='flex items-center gap-2' key={index}>
                <RadioGroupItem id={option} value={option} onClick={() => setFieldValue('budget', option)} />
                <label className='text-sm cursor-pointer' htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-4">
        <p className='text-sm'>When are you planning to buy?</p>
        <RadioGroup name='period' value={values.period} onChange={handleChange}>
          <div className='grid grid-cols-2 grid-rows-4 gap-2'>
            {periodOptions.map((option, index) => (
              <div className='flex items-center gap-2' key={index}>
                <RadioGroupItem id={option} value={option} checked={values.period === option} onClick={() => setFieldValue('period', option)} />
                <label className='text-sm cursor-pointer' htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>Is there anything else you would like us to know before we contact you?</p>
        <Textarea name='message' value={values.message} onChange={handleChange} placeholder='eg. I am looking for a property in Istanbul, I am a first time buyer, etc.' />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-sm'>What is your preferred language?</p>
        <Select name='language' value={values.language} onValueChange={(value) => setFieldValue('language', value)}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='Select language' />
          </SelectTrigger>
          <SelectContent>
            {languageOptions.map((option, index) => (
              <SelectItem key={index} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type='submit' className='w-full'>Submit</Button>
    </form>
  )
}
