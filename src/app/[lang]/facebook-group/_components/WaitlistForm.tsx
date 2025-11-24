'use client'

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WaitlistPage } from "@/types/sanity.types";
import storage, { StorageKey } from "@/lib/storage.util";
import { useMutation } from "@tanstack/react-query";
import { ContactInfo } from "@/types/main";
import { persistUserInfo } from "@/lib/services/user.service";
import useUserInfo from "@/hooks/useUserInfo";
import { makePOSTRequest } from "@/lib/services/api.service";
import { RegistrationRequest } from "@/types/webinar.type";
import dynamic from "next/dynamic";

const PhoneInput = dynamic(() => import('@/components/ui/phone-input').then(mod => mod.PhoneInput), {
  loading: () => <Input placeholder="Loading..." />
})

type WaitlistFormProps = {
  formData: WaitlistPage['waitlistForm']
}

export default function WaitlistForm({ formData }: WaitlistFormProps) {
  const router = useRouter();
  const userInfo = useUserInfo();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const contactInfo = { ...userInfo, ...values } as ContactInfo;
      const payload: RegistrationRequest = {
        firstName: contactInfo.firstName,
        lastName: contactInfo.lastName,
        email: contactInfo.email,
        phone: contactInfo.phoneNumber,
        language: userInfo.lang,
        utmInfo: {
          utmSource: contactInfo.utm.source,
          utmMedium: contactInfo.utm.medium,
          utmCampaign: contactInfo.utm.campaign,
          utmTerm: contactInfo.utm.term,
          utmContent: contactInfo.utm.content,
        }
      }

      await makePOSTRequest('/registration/facebook-group', payload)
      persistUserInfo(contactInfo);
    },
    onSuccess: () => {
      storage.set(StorageKey.REGISTERED_WAITLIST, true, { expiration: 1000 * 60 * 60 * 24 * 30 });
      router.push('/waitlist/thank-you');
    }
  });


  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: userInfo,
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
      <PhoneInput
        required
        title={formData?.form?.phone || 'Phone Number'}
        name="phoneNumber"
        value={values.phoneNumber}
        onChange={(value) => setFieldValue('phoneNumber', value)}
      />
      <Button isLoading={isPending} disabled={isPending} variant='accent' className='!mt-4 uppercase font-semibold' type='submit'>
        {formData?.form?.submitButton || 'Join the Group'}
      </Button>
    </form>
  )
}
