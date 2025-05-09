'use client'

import { useFormik } from 'formik';
import { Icon } from '@iconify/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BankxLawyerForm from './BankxLawyerForm';
import React, { useMemo, useState, Fragment } from 'react'
import { RegistrationFormType } from '@/types/main';
import { PopoverClose } from '@radix-ui/react-popover';
import DocumentUploadsForm from './DocumentUploadsForm';
import PersonalInformationForm from './PersonalInformationForm';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import useURL from '@/hooks/useURL';
import { BankPackage } from './PackageCard';
import { BankPackagesPage } from '@/types/sanity.types';
import ParentInformationForm from './ParentInformationForm';
import { PACKAGE_TYPE } from '@/lib/mockdata';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BankDetailsModal from './BankDetailsModal';
import * as Yup from 'yup';

type RegistrationFormProps = {
  packages: BankPackage[]
  form: BankPackagesPage['form']
}

export default function RegistrationForm({ packages, form }: RegistrationFormProps) {
  const { searchParams } = useURL();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceID, setReferenceID] = useState<string | null>(null);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);

  const [activePackageSlug, setActivePackageSlug] = useState(searchParams.get('package') || packages[0].slug || PACKAGE_TYPE['basic-package']);

  const activePackage = useMemo(() =>
    packages.find((pkg) => pkg.slug === activePackageSlug) as BankPackage,
    [packages, activePackageSlug]
  );

  const getTimeString = (date: Date) => {
    return date.toLocaleTimeString('en-US',
      { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  const getDateString = (date: Date) => {
    return date.toLocaleDateString('en-US',
      { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long' })
  }

  const { values, errors, touched, handleChange, setFieldValue, setFieldTouched, handleSubmit } = useFormik<RegistrationFormType>({
    initialValues: {
      package: activePackageSlug,
      personalInformation: {
        salutation: 'Mr.',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      },
      nextOfKin: {
        fathersFirstName: '',
        fathersLastName: '',
        mothersFirstName: '',
        mothersLastName: '',
        motherMaidenName: '',
      },
      bankAndLawyer: {
        openingBalance: activePackage?.minimumDeposit ? activePackage.minimumDeposit.toString() : '0',
        bankAppointment: undefined,
        lawyerAppointment: undefined,
      },
      travelInfo: {
        areYouTravelingAlone: undefined,
        hotel: false,
        numberOfPeople: 0,
        numberOfChildren: 0,
        arrivalDate: undefined,
        departureDate: undefined,
        rentalCar: 'Small',
        requireRentalCar: false,
        airportTransfer: false,
        comments: '',
      },
      documentUpload: {
        main: {
          passport: '',
          idFront: '',
          idBack: '',
          utilityBill: '',
          proofOfTravel: '',
        },
        additional: [],
      },
      paymentMethod: 'bankTransfer',
    },
    validationSchema: Yup.object({
      personalInformation: Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
      }),
      nextOfKin: Yup.object({
        fathersFirstName: Yup.string().required('Fathers first name is required'),
        fathersLastName: Yup.string().required('Fathers last name is required'),
        mothersFirstName: Yup.string().required('Mothers first name is required'),
        mothersLastName: Yup.string().required('Mothers last name is required'),
        motherMaidenName: Yup.string().required('Mothers maiden name is required'),
      }),
      bankAndLawyer: Yup.object({
        openingBalance: Yup.number().when('bankAppointment', {
          is: true,
          then: (schema) => schema.min(activePackage.minimumDeposit || 0, `Minimum initial deposit is €${(activePackage.minimumDeposit || 0).toLocaleString()}`).required('Opening balance is required'),
          otherwise: (schema) => schema.optional(),
        }),
      }),
      travelInfo: Yup.object({
        arrivalDate: Yup.date().required('Arrival date is required'),
        departureDate: Yup.date().required('Departure date is required'),
      }),
      documentUpload: Yup.object({
        main: Yup.object({
          proofOfTravel: Yup.string().required('Proof of travel is required'),
          utilityBill: Yup.string().required('Utility bill is required'),
          passport: Yup.string(),
          idFront: Yup.string(),
          idBack: Yup.string(),
        }).test('identity-documents', 'Either passport or ID (front and back) is required', function (value) {
          const hasPassport = !!value.passport;
          const hasId = !!value.idFront && !!value.idBack;
          return hasPassport || hasId;
        }),
      }),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const payload = {
          package: PACKAGE_TYPE[values.package as keyof typeof PACKAGE_TYPE],
          packagePrice: packages.find((pkg) => pkg.slug === values.package)?.price,
          stripePriceId: packages.find((pkg) => pkg.slug === values.package)?.stripePriceId,
          personalInformation: values.personalInformation,
          nextOfKin: values.nextOfKin,
          bankAndLawyer: {
            ...values.bankAndLawyer,
            openingBalance: values.bankAndLawyer.openingBalance ? `€${Number(values.bankAndLawyer.openingBalance).toLocaleString()}` : '€0',
          },
          travelInfo: {
            ...values.travelInfo,
            arrivalDate: values.travelInfo.arrivalDate ? getDateString(new Date(values.travelInfo.arrivalDate)) : '',
            departureDate: values.travelInfo.departureDate ? getDateString(new Date(values.travelInfo.departureDate)) : '',
            arrivalTime: values.travelInfo.arrivalDate ? getTimeString(new Date(values.travelInfo.arrivalDate)) : '',
            departureTime: values.travelInfo.departureDate ? getTimeString(new Date(values.travelInfo.departureDate)) : '',
          },
          documentUpload: values.documentUpload,
          paymentMethod: values.paymentMethod,
        }
        const response = await fetch('https://automations.hibarr.net/webhook/b420ae2d-1fa1-42a0-9955-a0228b381e0d', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        const data = await response.json()
        setIsLoading(false);
        setIsSuccess(true);
        if (activePackage.price > 0) {
          if (values.paymentMethod === 'payOnline' && data.url) {
            router.push(data.url);
            setTimeout(() => {
              setUrl(data.url);
            }, 1000);
          } else if (values.paymentMethod === 'bankTransfer') {
            setReferenceID(data.reference);
            setShowBankTransferModal(true);
          }
        } else {
          setTimeout(() => {
            router.push('webinar')
          }, 2000);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    },
  })

  const getSectionErrors = (key: keyof RegistrationFormType): Record<string, string> => {
    const sectionTouched = touched[key];
    const sectionErrors = errors[key];

    if (!sectionTouched || !sectionErrors) return {};

    if (typeof sectionTouched === 'boolean') {
      return sectionErrors ? { [key]: sectionErrors as string } : {};
    }

    const result: Record<string, string> = {};
    Object.keys(sectionTouched).forEach(fieldKey => {
      const touchedValue = sectionTouched[fieldKey as keyof typeof sectionTouched];
      const errorValue = sectionErrors[fieldKey as keyof typeof sectionErrors];

      if (touchedValue && errorValue) {
        result[fieldKey] = errorValue as string;
      }
    });

    return result;
  };

  const sections = [
    {
      title: form?.personalInformationSection?.title,
      component: <PersonalInformationForm form={form} values={values} errors={getSectionErrors('personalInformation')} handleChange={handleChange} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} />,
    },
    {
      title: form?.parentsInformationSection?.title,
      component: <ParentInformationForm form={form} values={values} errors={getSectionErrors('nextOfKin')} handleChange={handleChange} setFieldTouched={setFieldTouched} />,
    },
    {
      title: form?.bankAndLawyerSection?.title,
      component: <BankxLawyerForm form={form} activePackage={activePackage} values={values} errors={{ ...getSectionErrors('bankAndLawyer'), ...getSectionErrors('travelInfo') }} handleChange={handleChange} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} />,
    },
    {
      title: form?.documentUploadsSection?.title,
      component: <DocumentUploadsForm form={form} values={values} errors={getSectionErrors('documentUpload')} handleChange={handleChange} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} />,
    },
  ]

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  }

  const updatePackage = (slug: string) => {
    const selectedPackage = packages.find((pkg) => pkg.slug === slug) as BankPackage;
    setActivePackageSlug(slug);
    setFieldValue('package', slug);
    if (selectedPackage.price === 0) {
      setFieldValue('travelInfo.numberOfPeople', 1);
    } else {
      setFieldValue('travelInfo.numberOfPeople', 0);
    }
    setFieldValue('bankAndLawyer.openingBalance', selectedPackage?.minimumDeposit ? selectedPackage.minimumDeposit.toString() : '0');
  }

  const isFormValid = useMemo(() => {
    if (activeStep === 0) {
      return values.personalInformation.firstName && values.personalInformation.lastName && values.personalInformation.email && values.personalInformation.phoneNumber;
    } else if (activeStep === 1) {
      return values.nextOfKin.fathersFirstName && values.nextOfKin.fathersLastName && values.nextOfKin.mothersFirstName && values.nextOfKin.mothersLastName && values.nextOfKin.motherMaidenName;
    } else if (activeStep === 2) {
      return values.travelInfo.arrivalDate && values.travelInfo.departureDate && values.bankAndLawyer.bankAppointment !== undefined && values.bankAndLawyer.lawyerAppointment !== undefined && (values.bankAndLawyer.bankAppointment || Number(values.bankAndLawyer.openingBalance) >= (activePackage.minimumDeposit || 0));
    } else if (activeStep === 3) {
      return (values.documentUpload.main.passport || (values.documentUpload.main.idFront && values.documentUpload.main.idBack)) && values.documentUpload.main.utilityBill && values.documentUpload.main.proofOfTravel;
    }

    return true;
  }, [activeStep, values, activePackage])

  return (
    <Card className='max-w-xl w-full mx-auto p-6'>
      {isSuccess ? (
        <Fragment>
          <BankDetailsModal referenceID={referenceID} activePackage={activePackage} showBankTransferModal={showBankTransferModal} setShowBankTransferModal={setShowBankTransferModal} />
          <div className='flex flex-col gap-4 items-center justify-center'>
            <Icon icon='mdi:check-circle' className='size-20 text-primary' />
            <p className='text-base text-center'>
              Your registration has been successfully submitted.
              <br />
              {values.package === 'basic-package' ?
                'We will get back to you soon.'
                :
                'You will be redirected to make payment shortly.'
              }
            </p>
            {values.package === 'basic-package' && (
              <p className='text-sm text-center'>You will be redirected shortly.</p>
            )}
            {url && (
              <p className='text-sm text-center'>
                If you are not redirected, please click <Link className='text-sm text-primary font-medium hover:underline' href={url} target='_blank' rel='noopener noreferrer'>here to proceed to make payment</Link>
              </p>
            )}
          </div>
        </Fragment>
      ) : (
        <form onSubmit={submitForm} className='flex flex-col gap-4'>
          <div className="flex items-center gap-2">
            {sections.map((_, index) => (
              <div key={index} className={`w-full h-1 rounded-full ${activeStep === index ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <p className='font-medium'>{sections[activeStep].title}</p>
            <div className="flex items-center gap-2 rounded-sm px-3 py-2 w-max bg-primary text-primary-foreground shrink-0">
              <Popover>
                <PopoverTrigger className='cursor-pointer flex items-center gap-2'>
                  <p className='font-normal'>Package:</p>
                  {values.package ? (
                    <p className='font-medium'>{packages.find((pkg) => pkg.slug === values.package)?.title} {packages.find((pkg) => pkg.slug === values.package)?.price ? `(€${packages.find((pkg) => pkg.slug === values.package)?.price.toLocaleString()})` : ''}</p>
                  ) : (
                    <p className='font-medium text-muted-foreground'>Select Package</p>
                  )}
                  <Icon icon='mdi:chevron-down' className='w-4 h-4' />
                </PopoverTrigger>
                <PopoverContent align='end' className='w-max flex flex-col items-start gap-2'>
                  {packages.map((pack, index) => (
                    <PopoverClose asChild key={index}>
                      <p className='cursor-pointer w-full' onClick={() => updatePackage(pack.slug)}>{pack.title} {pack.price ? `(€${pack.price.toLocaleString()})` : ''}</p>
                    </PopoverClose>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            {sections[activeStep].component}
          </div>
          <div className="flex items-center gap-2 overflow-hidden justify-between">
            {activeStep > 0 && (
              <Button variant='secondary' className='w-full shrink' type='button' onClick={() => setActiveStep(activeStep - 1)}>
                {form?.buttons?.back}
              </Button>
            )}
            {activeStep < sections.length - 1 && (
              <Button disabled={!isFormValid} className='w-full shrink' type='button' onClick={() => setActiveStep(activeStep + 1)}>
                {form?.buttons?.next}
              </Button>
            )}
            {activeStep === sections.length - 1 && (
              <Button isLoading={isLoading} disabled={!isFormValid} className='w-full shrink' type='submit'>
                {form?.buttons?.submit}
              </Button>
            )}
          </div>
        </form>
      )}
    </Card>
  )
}
