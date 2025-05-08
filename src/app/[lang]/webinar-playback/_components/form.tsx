"use client";

import { Button } from '@/components/ui/button';
import React, { Fragment } from 'react';

export default function ReactFormWithTailwind({ lang }: { lang: string }) {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData);

    const payload = {
      personalInformation: {
        firstName: values.firstName?.toString() || '',
        lastName: values.lastName?.toString() || '',
        email: values.email?.toString() || '',
        phone: values.phone?.toString() || '',
        subscribeToEmails: values.subscribeToEmails ? true : false,
        language: lang
      }
    };

    try {
      await fetch('https://automations.hibarr.net/webhook-test/8ca2a553-d9ac-4c0b-bbf2-b353259359b0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      alert('Form submitted successfully');
    } catch (error) {
      console.log(error);
      alert('Failed to send data. Please try again later.');
    }
  };

  return (
    <Fragment>
      <section className="flex items-center justify-center min-h-screen  overflow-x-hidden">
        <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-3xl font-bold mb-6">Video Archive Access Form</h3>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mb-4">
              <div className="mb-4 w-full lg:w-1/2 px-2">
                <input name="firstName" className="w-full p-4 text-lg bg-gray-50 outline-none rounded" type="text" placeholder="First Name" required />
              </div>
              <div className="mb-4 w-full lg:w-1/2 px-2">
                <input name="lastName" className="w-full p-4 text-lg bg-gray-50 outline-none rounded" type="text" placeholder="Last Name" required />
              </div>
            </div>
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <input name="email" className="w-full text-lg bg-gray-50 outline-none" type="email" placeholder="name@email.com" required />
            </div>
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <input name="phone" className="w-full text-lg bg-gray-50 outline-none" type="tel" placeholder="Enter your telephone number" required />
            </div>
            <div className="mb-4 flex items-center px-3">
              <input name="subscribeToEmails" type="checkbox" className="mr-2" />
              <label className="text-lg text-gray-600">Subscribe to email notifications</label>
            </div>
            <Button type="submit" className='w-full' size="lg">Submit</Button>
          </form>
        </div>
      </section>
    </Fragment>
  );
}
