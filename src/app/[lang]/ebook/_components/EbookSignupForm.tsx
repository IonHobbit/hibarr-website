'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { PhoneInput } from "@/components/ui/phone-input";
import useUserInfo from "@/hooks/useUserInfo";
import { persistUserInfo } from "@/lib/services/user.service";
import storage, { StorageKey } from "@/lib/storage.util";
import { RegistrationRequest } from "@/types/webinar.type";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import useTranslation from "@/hooks/useTranslation";
import { makePOSTRequest } from "@/lib/services/api.service";
import { ContactInfo } from "@/types/main";
import dynamic from "next/dynamic";

const PhoneInput = dynamic(() => import('@/components/ui/phone-input').then(mod => mod.PhoneInput), {
  loading: () => <Input placeholder="Loading..." />
})

export default function EbookSignupForm() {
  const userInfo = useUserInfo();
  const router = useRouter();

  // Translation hooks
  const { data: thankYouTitle } = useTranslation('Thank you for signing up!');
  const { data: emailSentText } = useTranslation('We will send you an email with the download link shortly.');
  const { data: firstNameTitle } = useTranslation('First Name');
  const { data: lastNameTitle } = useTranslation('Last Name');
  const { data: emailTitle } = useTranslation('Email');
  const { data: phoneNumberTitle } = useTranslation('Phone Number');
  const { data: checkEmailButton } = useTranslation('Check Your Email!');
  const { data: privacyText } = useTranslation('No spam. Unsubscribe anytime. Your privacy is protected.');

  const { mutate, error, isPending, isSuccess } = useMutation({
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

      await makePOSTRequest('/registration/ebook', payload)
      persistUserInfo(contactInfo);
    },
    onSuccess: () => {
      storage.set(StorageKey.DOWNLOADED_EBOOK, true, { expiration: 1000 * 60 * 60 * 24 * 30 })
      router.push('/ebook/thank-you');
    }
  })

  const translation = useTranslation(error?.message || '');
  const errorMessage = translation.data?.text;

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
          <h3 className="text-2xl md:text-3xl md:text-center text-primary">{thankYouTitle?.text || 'Thank you for signing up!'}</h3>
          <p className="text-sm md:text-lg text-center">
            {emailSentText?.text || 'We will send you an email with the download link shortly.'}
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
              title={firstNameTitle?.text || 'First Name'}
              placeholder={firstNameTitle?.text || 'First Name'}
              value={values.firstName}
            />
            <Input
              required
              hideRequiredAsterisk
              type="text"
              name="lastName"
              onChange={handleChange}
              value={values.lastName}
              title={lastNameTitle?.text || 'Last Name'}
              placeholder={lastNameTitle?.text || 'Last Name'}
            />
          </div>
          <Input
            required
            hideRequiredAsterisk
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            title={emailTitle?.text || 'Email'}
            placeholder={emailTitle?.text || 'Email'}
          />
          <PhoneInput
            required
            hideRequiredAsterisk
            name="phoneNumber"
            title={phoneNumberTitle?.text || 'Phone Number'}
            value={values.phoneNumber}
            onChange={(value) => setFieldValue('phoneNumber', value)}
          />
          {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
          <Button type="submit" disabled={!isValid} isLoading={isPending} className="w-full">{checkEmailButton?.text || 'Check Your Email!'}</Button>

          <p className="text-xs text-gray-500 text-center">
            {privacyText?.text || 'No spam. Unsubscribe anytime. Your privacy is protected.'}
          </p>
        </form>
      }
    </div>
  )
}
