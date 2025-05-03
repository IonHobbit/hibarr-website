'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useRegistrationCheck from "@/hooks/useRegistrationCheck";
import { cn } from "@/lib/utils";
import { callZapierWebhook } from "@/lib/zapier";
import { ZapierSignupPayload } from "@/types/main";
import { HomePage } from "@/types/sanity.types";
import * as Yup from 'yup';
import { useFormik } from "formik";
import Image from "next/image";

type SignupSectionProps = {
  data: HomePage['freebieSignupSection'];
}

export default function SignupSection({ data }: SignupSectionProps) {
  const { isRegistered, register } = useRegistrationCheck();

  const { values, isValid, errors, touched, setFieldTouched, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      consent: false,
      package: 'vip',
      alphaCashReferral: '',
      isAlphaCashMember: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phoneNumber: Yup.string().matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number, please use international format (+491234567890)'),
      consent: Yup.boolean().required('Consent is required').oneOf([true], 'Consent is required'),
      package: Yup.string().required('Package is required'),
      alphaCashReferral: Yup.string().url('Invalid referral link')
        .matches(/^https:\/\/member\.alphacashclub\.com\/shared\/register\?sponsor=[\w-]+$/, 'Invalid referral link')
        .when('isAlphaCashMember', {
          is: true,
          then: (schema) => schema.required('Referral link is required'),
          otherwise: (schema) => schema.optional()
        }),
    }),
    onSubmit: async (values) => {
      const payload: ZapierSignupPayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        type: 'signup',
        package: values.package as 'vip' | 'bank',
        isAlphaCashMember: values.isAlphaCashMember,
        alphaCashReferral: values.alphaCashReferral.replace('https://member.alphacashclub.com/shared/register?sponsor=', '')
      };

      try {
        await callZapierWebhook(payload);
        register('/', 'signup');
      } catch (error) {
        console.error(error);
      }
    },
  })

  const packages = [
    {
      label: 'VIP Package',
      value: 'vip',
      price: 5000,
    },
    {
      label: 'Bank Package',
      value: 'bank',
      price: values.isAlphaCashMember ? 500 : 1000,
    },
  ]

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  }

  return (
    <section id='signup' className={cn('bg-primary flex flex-col transition-all duration-300', isRegistered ? 'min-h-[30vh]' : 'min-h-[60vh]')}>
      <div className="section h-full grow max-w-screen-sm">
        {isRegistered ?
          <div className="flex flex-col gap-6 p-8 bg-background max-w-2xl h-full m-auto rounded-lg overflow-hidden">
            <h3 className="text-3xl md:text-4xl md:text-center ">Welcome to Hibarr!</h3>
            <p className="text-sm md:text-base text-center">
              You just took the first step to unlock your investment potential! We will reach out via email shortly.
            </p>
          </div>
          :
          <div className="grid grid-cols-1 place-items-center bg-background h-full grow rounded-lg overflow-hidden">
            <div className="flex flex-col gap-4 p-6">
              <h3 className="text-3xl md:text-center ">Join us today!</h3>

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
                    error={errors.firstName && touched.firstName ? errors.firstName : undefined}
                    onBlur={() => setFieldTouched('firstName', true)}
                  />
                  <Input
                    required
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    value={values.lastName}
                    title={data?.form?.lastName}
                    placeholder={data?.form?.lastName}
                    error={errors.lastName && touched.lastName ? errors.lastName : undefined}
                    onBlur={() => setFieldTouched('lastName', true)}
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
                  error={errors.email && touched.email ? errors.email : undefined}
                  onBlur={() => setFieldTouched('email', true)}
                />
                <Input
                  type="tel"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  title="Phone Number"
                  placeholder="Phone Number"
                  error={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : undefined}
                  onBlur={() => setFieldTouched('phoneNumber', true)}
                />
                <Select>
                  <SelectTrigger title="Package" className="w-full">
                    <SelectValue placeholder="Select Package" />
                  </SelectTrigger>
                  <SelectContent>
                    {packages.map((p) => (
                      <SelectItem key={p.value} value={p.value}>{p.label} - €{p.price}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-end gap-4">
                  <Image src="/images/alphacashclub-logo.png" alt="Alpha Cash Logo" width={50} height={50} />
                  <div className="flex flex-col gap-1">
                    <div className="flex items-start gap-2">
                      <Checkbox id="isAlphaCashMember" checked={values.isAlphaCashMember} onClick={() => setFieldValue('isAlphaCashMember', !values.isAlphaCashMember)} />
                      <label htmlFor="isAlphaCashMember" className="text-xs cursor-pointer">Are you an Alpha Cash Club member?</label>
                    </div>
                    <p className="text-xs text-muted-foreground">Alpha Cash members get special priviledges and discounts.</p>
                  </div>
                </div>
                {values.isAlphaCashMember && (
                  <Input
                    required
                    title="Alpha Cash Referral link"
                    type="url"
                    name="alphaCashReferral"
                    value={values.alphaCashReferral}
                    onChange={handleChange}
                    error={errors.alphaCashReferral && touched.alphaCashReferral ? errors.alphaCashReferral : undefined}
                    onBlur={() => setFieldTouched('alphaCashReferral', true)}
                    placeholder="Enter your Alpha Cash Referral link"
                  />
                )}

                <Button type="submit" disabled={!isValid}>{data?.form?.submit}</Button>
                <div className="flex items-start gap-2">
                  <Checkbox id="consent" required checked={values.consent} onClick={() => setFieldValue('consent', !values.consent)} />
                  <label htmlFor="consent" className="text-xs cursor-pointer">{data?.consent}</label>
                </div>
              </form>
            </div>
          </div>
        }
      </div>
    </section>
  )
}
