'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import useUserInfo from "@/hooks/useUserInfo";
import { persistUserInfo } from "@/lib/services/user.service";
import storage, { StorageKey } from "@/lib/storage.util";
import { callZapierWebhook } from "@/lib/zapier";
import { ZapierEbookPayload } from "@/types/main";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

export default function EbookSignupForm() {
  const userInfo = useUserInfo();
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async () => {
      const contactInfo = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        language: userInfo.language,
        utm: userInfo.utm,
      }
      const payload: ZapierEbookPayload = {
        ...contactInfo,
        type: 'ebook'
      };

      try {
        await callZapierWebhook(payload);
        persistUserInfo(contactInfo);
      } catch (error) {
        console.error('Error calling Zapier webhook:', error);
      }
    },
    onSuccess: () => {
      storage.set(StorageKey.DOWNLOADED_EBOOK, true, { expiration: 1000 * 60 * 60 * 24 * 30 })
      router.push('/ebook/thank-you');
    }
  })

  const { values, isValid, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: userInfo?.firstName || '',
      lastName: userInfo?.lastName || '',
      email: userInfo?.email || '',
      phoneNumber: userInfo?.phoneNumber || '',
    },
    onSubmit: async () => {
      mutate();
    },
  })

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  }

  return (
    <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-200">
      {isSuccess ?
        <div className="flex flex-col gap-6 p-3 bg-background max-w-2xl h-full m-auto rounded-lg overflow-hidden">
          <h3 className="text-2xl md:text-3xl md:text-center text-primary">Thank you for signing up!</h3>
          <p className="text-sm md:text-lg text-center">
            We will send you an email with the download link shortly.
          </p>
        </div>
        :
        <form onSubmit={submitForm} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              required
              hideRequiredAsterisk
              type="text"
              name="firstName"
              onChange={handleChange}
              title="First Name"
              placeholder="First Name"
              value={values.firstName}
            />
            <Input
              required
              hideRequiredAsterisk
              type="text"
              name="lastName"
              onChange={handleChange}
              value={values.lastName}
              title="Last Name"
              placeholder="Last Name"
            />
          </div>
          <Input
            required
            hideRequiredAsterisk
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            title="Email"
            placeholder="Email"
          />
          <PhoneInput
            required
            hideRequiredAsterisk
            name="phoneNumber"
            title={'Phone Number'}
            value={values.phoneNumber}
            onChange={(value) => setFieldValue('phoneNumber', value)}
          />
          <Button type="submit" disabled={!isValid} isLoading={isPending} className="w-full">Check Your Email!</Button>

          <p className="text-xs text-gray-500 text-center">
            No spam. Unsubscribe anytime. Your privacy is protected.
          </p>
        </form>
      }
    </div>
  )
}
