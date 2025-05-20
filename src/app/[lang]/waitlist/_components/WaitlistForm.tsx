'use client'

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WaitlistPage } from "@/types/sanity.types";
import storage, { StorageKey } from "@/lib/storage.util";

type WaitlistFormProps = {
  formData: WaitlistPage['waitlistForm']
}

export default function WaitlistForm({ formData }: WaitlistFormProps) {
  const router = useRouter();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
    onSubmit: (values) => {
      storage.set(StorageKey.REGISTERED_WAITLIST, true, { expiration: 1000 * 60 * 60 * 24 * 30 });
      // localStorage.setItem('waitlist-form-data', JSON.stringify(values))
      router.push('/waitlist/thank-you')
    }
  })

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit()
  }

  return (
    <form className='flex flex-col gap-2' onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-2 gap-2">
        <Input
          type="text"
          required
          title={formData?.form?.firstName || 'First Name'}
          name="firstName"
          placeholder="John"
          value={values.firstName}
          onChange={handleChange}
        />
        <Input
          type="text"
          required
          title={formData?.form?.lastName || 'Last Name'}
          name="lastName"
          placeholder="Doe"
          value={values.lastName}
          onChange={handleChange}
        />
      </div>
      <Input
        type="email"
        required
        title={formData?.form?.email || 'Email'}
        name="email"
        placeholder="john.doe@gmail.com"
        value={values.email}
        onChange={handleChange}
      />
      <Input
        type="tel"
        required
        title={formData?.form?.phone || 'Phone Number'}
        name="phoneNumber"
        placeholder="+1234567890"
        value={values.phoneNumber}
        onChange={handleChange}
      />
      <Button variant='accent' className='!mt-4 uppercase font-semibold' type='submit'>
        {formData?.form?.submitButton || 'Join the Waitlist'}
      </Button>
    </form>
  )
}
