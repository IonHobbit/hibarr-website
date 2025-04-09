'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Dictionary } from "@/lib/dictionary";
import { useFormik } from "formik";
import Image from "next/image";

type FreebieSignupSectionProps = {
  dictionary: Dictionary;
}

export default function FreebieSignupSection({ dictionary }: FreebieSignupSectionProps) {
  const { values, isValid, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      consent: false,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  })

  return (
    <section id='freebie' className='min-h-[60vh] bg-primary flex flex-col'>
      <div className="section h-full grow max-w-screen-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center bg-background h-full grow rounded-lg overflow-hidden">
          <div className="flex flex-col gap-4 p-6">
            <h3 className="text-3xl text-center">{dictionary.home.freebieSignup.title}</h3>
            <p className="text-center">{dictionary.home.freebieSignup.description}</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Input type="text" title={dictionary.home.freebieSignup.form.firstName}
                  placeholder={dictionary.home.freebieSignup.form.firstName}
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                />
                <Input type="text" title={dictionary.home.freebieSignup.form.lastName}
                  placeholder={dictionary.home.freebieSignup.form.lastName}
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                />
              </div>
              <Input type="email" title={dictionary.home.freebieSignup.form.email}
                placeholder={dictionary.home.freebieSignup.form.email}
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              <Button type="submit" disabled={!isValid}>{dictionary.home.freebieSignup.form.submit}</Button>
              <div className="flex items-start gap-2">
                <Checkbox id="consent" checked={values.consent} onClick={() => setFieldValue('consent', !values.consent)} />
                <label htmlFor="consent" className="text-xs cursor-pointer">{dictionary.home.freebieSignup.consent}</label>
              </div>
            </form>
          </div>
          <div className="relative w-full h-full">
            <Image src="/images/freebie-image.webp" alt="Webinar" fill sizes="100%" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
