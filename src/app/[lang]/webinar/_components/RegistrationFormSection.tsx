'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WebinarPage } from "@/types/sanity.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useFormik } from "formik";
import Countdown from "./Countdown";

type RegistrationFormSectionProps = {
  data: WebinarPage;
};

export default function RegistrationFormSection({ data }: RegistrationFormSectionProps) {
  const { values, handleChange, handleSubmit, isValid } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  })

  return (
    <section id='register' className='bg-primary bg-[url("/images/webinar-registration-background.webp")] bg-cover bg-center flex flex-col bg-blend-soft-light'>
      <div className="section h-full grow py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center h-full grow overflow-hidden">
          <div className="relative w-full flex flex-col items-center gap-6">
            <Countdown date={data.webinarInformationSection?.date ?? ''} timezone={data.webinarInformationSection?.timezone ?? ''} />
            <div className="grid grid-cols-2 gap-3">
              {data.registrationSection?.webinarFeatures?.map((feature) => (
                <div key={feature.title} className="flex items-center bg-secondary gap-4 rounded-lg p-4">
                  <Icon icon={feature.icon ?? ''} className="size-10 shrink-0 text-primary" />
                  <p className="text-sm">{feature.title}</p>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 bg-background rounded-lg justify-between h-full md:max-w-md mx-auto w-full">
            <h3 className="text-xl md:text-2xl text-center">{data.registrationSection?.form?.title ?? 'Register for the webinar'}</h3>
            <Input type="text" title={data.registrationSection?.form?.firstName ?? 'First Name'}
              placeholder={data.registrationSection?.form?.firstName ?? 'First Name'}
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
            />
            <Input type="text" title={data.registrationSection?.form?.lastName ?? 'Last Name'}
              placeholder={data.registrationSection?.form?.lastName ?? 'Last Name'}
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
            />
            <Input type="email" title={data.registrationSection?.form?.email ?? 'Email'}
              placeholder={data.registrationSection?.form?.email ?? 'Email'}
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <Input type="tel" title={data.registrationSection?.form?.phone ?? 'Phone'}
              placeholder={data.registrationSection?.form?.phone ?? 'Phone'}
              name="phone"
              value={values.phone}
              onChange={handleChange}
            />
            <Button type="submit" disabled={!isValid}>{data.registrationSection?.form?.submitButton ?? 'Register'}</Button>
          </form>
        </div>
      </div>
    </section >
  )
}
