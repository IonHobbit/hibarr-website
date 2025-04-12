'use client'

import ThreeDBook from "@/components/ThreeDBook";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import useURL from "@/hooks/useURL";
import { HomePage } from "@/types/sanity.types";
import { useFormik } from "formik";
import { PortableText } from "next-sanity";
import Image from "next/image";

type FreebieSignupSectionProps = {
  data: HomePage['freebieSignupSection'];
}

export default function FreebieSignupSection({ data }: FreebieSignupSectionProps) {

  const { replaceParams } = useURL();

  const { values, isValid, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      consent: false,
    },
    onSubmit: (values) => {
      console.log(values);
      replaceParams({ key: 'register', value: 'done' });
    },
  })

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  }

  return (
    <section id='freebie' className='min-h-[60vh] bg-primary flex flex-col'>
      <div className="section h-full grow max-w-screen-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 place-items-center bg-background h-full grow rounded-lg overflow-hidden">
          <div className="flex flex-col gap-4 p-6">
            <h3 className="text-3xl md:text-center ">{data?.title}</h3>
            <PortableText value={data?.description || []} />
            <form onSubmit={submitForm} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  required
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  title={data?.form?.firstName}
                  placeholder={data?.form?.firstName}
                  value={values.firstName}
                />
                <Input
                  required
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={values.lastName}
                  title={data?.form?.lastName}
                  placeholder={data?.form?.lastName}
                />
              </div>
              <Input
                required
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                title={data?.form?.email}
                placeholder={data?.form?.email}
              />
              <Button type="submit" disabled={!isValid}>{data?.form?.submit}</Button>
              <div className="flex items-start gap-2">
                <Checkbox id="consent" required checked={values.consent} onClick={() => setFieldValue('consent', !values.consent)} />
                <label htmlFor="consent" className="text-xs cursor-pointer">{data?.consent}</label>
              </div>
            </form>
          </div>
          <div className="relative w-full h-80 md:h-full flex items-center justify-center p-2">
            <div className="relative w-full h-full p-1 rounded-lg overflow-hidden">
              <Image src="/images/freebie-book-background.jpg" alt="Book Background" fill sizes="100%" className="object-cover object-top blur-sm " />
            </div>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <ThreeDBook />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
