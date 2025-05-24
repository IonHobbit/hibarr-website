'use client'

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WaitlistPage } from "@/types/sanity.types";
import storage, { StorageKey } from "@/lib/storage.util";
import { callZapierWebhook } from "@/lib/zapier";
import { useMutation } from "@tanstack/react-query";
import { ZapierWaitlistPayload } from "@/types/main";
import { getUserInfo, persistUserInfo } from "@/lib/services/user.service";

type WaitlistFormProps = {
  formData: WaitlistPage['waitlistForm']
}

export default function WaitlistForm({ formData }: WaitlistFormProps) {
  const router = useRouter();
  const userInfo = getUserInfo();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const contactInfo = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
      }

      try {
        const payload: ZapierWaitlistPayload = {
          ...contactInfo,
          type: 'waitlist',
        }
        await callZapierWebhook(payload);
        // persist user info to storage
        persistUserInfo(contactInfo);
        storage.set(StorageKey.REGISTERED_WAITLIST, true, { expiration: 1000 * 60 * 60 * 24 * 30 });
      } catch (error) {
        console.error('Error calling Zapier webhook:', error);
      }
    },
    onSuccess: () => {
      router.push('/waitlist/thank-you');
    }
  });


  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
    onSubmit: () => mutate()
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
      <Button isLoading={isPending} disabled={isPending} variant='accent' className='!mt-4 uppercase font-semibold' type='submit'>
        {formData?.form?.submitButton || 'Join the Waitlist'}
      </Button>
    </form>
  )
}
