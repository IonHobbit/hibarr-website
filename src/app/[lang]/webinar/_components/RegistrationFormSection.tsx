'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WebinarPage } from "@/types/sanity.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useFormik } from "formik";
import Countdown from "./Countdown";
import useRegistrationCheck from "@/hooks/useRegistrationCheck";
import { ZapierWebinarPayload } from "@/types/main";
import { callZapierWebhook } from "@/lib/zapier";
import { useMutation } from "@tanstack/react-query";
import * as Yup from 'yup';
import storage, { StorageKey } from "@/lib/storage.util";
import { useRouter } from "next/navigation";
import { persistUserInfo } from "@/lib/services/user.service";
import { PhoneInput } from "@/components/ui/phone-input";
import useUserInfo from "@/hooks/useUserInfo";

type RegistrationFormSectionProps = {
  data: WebinarPage;
};

export default function RegistrationFormSection({ data }: RegistrationFormSectionProps) {
  const router = useRouter();
  const userInfo = useUserInfo();
  const { isRegistered } = useRegistrationCheck();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const contactInfo = values;
      try {
        const payload: ZapierWebinarPayload = {
          ...contactInfo,
          type: 'webinar',
        }
        await callZapierWebhook(payload);
        // persist user info to storage
        persistUserInfo(contactInfo);
      } catch (error) {
        console.error('Error calling Zapier webhook:', error);
      }
    },
    onSuccess: () => {
      storage.set(StorageKey.REGISTERED_WEBINAR, true, { expiration: 1000 * 60 * 60 * 24 * 30 })
      router.push('/webinar/thank-you');
    }
  });

  const { values, handleChange, handleSubmit, isValid, errors, touched, setFieldTouched, setFieldValue } = useFormik({
    initialValues: userInfo,
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address, please enter a valid email address').required('Email is required'),
      phone: Yup.string().required('Phone is required').matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number, please use international format (+49 123 456 7890)'),
    }),
    onSubmit: () => mutate(),
  });

  return (
    <section id='register' className='bg-primary bg-[url("/images/webinar-registration-background.webp")] bg-cover bg-center flex flex-col bg-blend-soft-light'>
      <div className="section h-full grow py-40">
        <div className="max-w-screen-md mx-auto flex md:hidden flex-col gap-4">
          <Countdown date={data.webinarInformationSection?.date || ''} timezone={data.webinarInformationSection?.timezone || ''} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center h-full grow overflow-hidden">
          <div className="relative w-full flex flex-col items-center gap-6 order-2 md:order-1">
            <div className="max-w-screen-md mx-auto hidden md:flex flex-col gap-4">
              <Countdown date={data.webinarInformationSection?.date || ''} timezone={data.webinarInformationSection?.timezone || ''} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3">
              {data.registrationSection?.webinarFeatures?.map((feature) => (
                <div key={feature.title} className="flex items-center bg-secondary text-primary backdrop-blur-lg gap-4 border rounded-md p-4 h-24">
                  <Icon icon={feature.icon || ''} className="size-10 shrink-0" />
                  <p className="text-sm">{feature.title}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full order-1 md:order-2">
            {isRegistered ?
              <div className="flex flex-col gap-4 p-6 bg-background rounded-lg justify-between h-max md:max-w-md mx-auto w-full">
                <h3 className="text-xl md:text-3xl text-center">Registration successful</h3>
                <p className="text-sm text-center">Thank you for registering for the webinar. We will send you a confirmation email shortly.</p>
                <p className="text-sm text-center">We look forward to seeing you at the webinar.</p>
              </div>
              :
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 bg-background rounded-lg justify-between h-full md:max-w-lg mx-auto w-full">
                <h3 className="text-xl md:text-2xl text-center">{data.registrationSection?.form?.title || 'Register for the webinar'}</h3>
                <Input type="text" title={data.registrationSection?.form?.firstName || 'First Name'}
                  placeholder="John"
                  name="firstName"
                  required
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={() => setFieldTouched('firstName', true)}
                  error={errors.firstName && touched.firstName ? errors.firstName : undefined}
                />
                <Input type="text" title={data.registrationSection?.form?.lastName || 'Last Name'}
                  placeholder="Doe"
                  name="lastName"
                  required
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={() => setFieldTouched('lastName', true)}
                  error={errors.lastName && touched.lastName ? errors.lastName : undefined}
                />
                <Input type="email" title={data.registrationSection?.form?.email || 'Email'}
                  placeholder="john.doe@example.com"
                  name="email"
                  required
                  value={values.email}
                  onChange={handleChange}
                  onBlur={() => setFieldTouched('email', true)}
                  error={errors.email && touched.email ? errors.email : undefined}
                />
                <PhoneInput title={data.registrationSection?.form?.phone || 'Phone'}
                  name="phone"
                  required
                  value={values.phoneNumber}
                  onChange={(value) => setFieldValue('phoneNumber', value)}
                  onBlur={() => setFieldTouched('phoneNumber', true)}
                  error={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : undefined}
                />
                <Button type="submit" isLoading={isPending} disabled={isPending || !isValid}>{data.registrationSection?.form?.submitButton || 'Register'}</Button>
              </form>
            }
          </div>
        </div>
      </div>
    </section >
  )
}
