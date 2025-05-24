'use client'

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import useRegistrationCheck from '@/hooks/useRegistrationCheck';
import { getUserInfo, persistUserInfo } from '@/lib/services/user.service';
import { callZapierWebhook } from '@/lib/zapier';
import { ZapierUglaPayload } from '@/types/main';
import { HomePage } from '@/types/sanity.types';
import { useFormik } from 'formik';

type FreebieFormProps = {
  data: HomePage['freebieSignupSection'];
  postSubmissionPath?: string;
}

export default function FreebieForm({ data, postSubmissionPath }: FreebieFormProps) {
  const userInfo = getUserInfo();
  const { register } = useRegistrationCheck();

  const { values, isValid, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: userInfo?.firstName || '',
      lastName: userInfo?.lastName || '',
      email: userInfo?.email || '',
      phoneNumber: userInfo?.phoneNumber || '',
      consent: false,
    },
    onSubmit: async (values) => {
      const contactInfo = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
      }
      const payload: ZapierUglaPayload = { ...contactInfo, type: 'ugla' };

      try {
        await callZapierWebhook(payload);
        // persist user info to storage
        persistUserInfo(contactInfo);
        register(postSubmissionPath || '/', '#freebie');
      } catch (error) {
        console.error(error);
      }
    },
  })

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  }

  return (
    <form onSubmit={submitForm} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          required
          type="text"
          name="firstName"
          onChange={handleChange}
          title={data?.form?.firstName || 'First Name'}
          placeholder={data?.form?.firstName || 'First Name'}
          value={values.firstName}
        />
        <Input
          required
          type="text"
          name="lastName"
          onChange={handleChange}
          value={values.lastName}
          title={data?.form?.lastName || 'Last Name'}
          placeholder={data?.form?.lastName || 'Last Name'}
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
  )
}
