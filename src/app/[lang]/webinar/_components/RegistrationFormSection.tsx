'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WebinarPage } from "@/types/sanity.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useFormik } from "formik";
import { useState } from "react";
import { useEffect } from "react";

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

  const webinarDate = new Date(`${data.webinarInformationSection?.date}`)
    .toLocaleString('en-US', {
      timeZone: data.webinarInformationSection?.timezone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      hour12: true,
      weekday: 'long',
      timeZoneName: 'shortGeneric',
    });

  const useCountdown = (targetDate: Date) => {
    const [days, setDays] = useState("0");
    const [hours, setHours] = useState("0");
    const [minutes, setMinutes] = useState("0");
    const [seconds, setSeconds] = useState("0");

    useEffect(() => {
      const now = new Date();
      const interval = setInterval(() => {
        const days = Math.floor((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60)) % 24;
        const minutes = Math.floor((targetDate.getTime() - now.getTime()) / (1000 * 60)) % 60;
        const seconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000) % 60;

        setDays(days.toString().padStart(2, '0'));
        setHours(hours.toString().padStart(2, '0'));
        setMinutes(minutes.toString().padStart(2, '0'));
        setSeconds(seconds.toString().padStart(2, '0'));
      }, 1000);

      return () => clearInterval(interval);
    }, [targetDate]);

    return [days, hours, minutes, seconds];
  }

  const [days, hours, minutes, seconds] = useCountdown(new Date(`${data.webinarInformationSection?.date}`));

  const Counter = ({ label, value }: { label: string, value: string }) => {
    return (
      <div className="flex flex-col items-center gap-1 w-max">
        <p className="text-6xl font-semibold text-center text-primary">{value}</p>
        <p className="text-sm text-center uppercase text-primary font-medium">{label}</p>
      </div>
    )
  }
  return (
    <section id='register' className='bg-primary bg-[url("https://hibarr.de/wp-content/uploads/2025/03/Iskele-Long-Beach-Cyprus-1920x1024-1.webp")] bg-cover bg-center flex flex-col bg-blend-soft-light'>
      <div className="section h-full grow py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center h-full grow overflow-hidden">
          <div className="relative w-full flex flex-col items-center gap-6">
            <p className="text-2xl font-semibold text-center text-primary-foreground">{webinarDate}</p>
            <div className="grid grid-cols-4 gap-2 place-items-center place-content-center bg-secondary w-full rounded-lg p-4">
              <Counter label="Days" value={days} />
              <Counter label="Hours" value={hours} />
              <Counter label="Minutes" value={minutes} />
              <Counter label="Seconds" value={seconds} />
            </div>
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
