import { useFormik } from 'formik';
import { Icon } from '@iconify/react';
import { Card } from '@/components/ui/card';
import PartnerInformationForm from './PartnerInformationForm';
import { Button } from '@/components/ui/button';
import BankxLawyerForm from './BankxLawyerForm';
import React, { useEffect, useMemo, useState } from 'react'
import { RegistrationFormType } from '@/types/main';
import { PopoverClose } from '@radix-ui/react-popover';
import DocumentUploadsForm from './DocumentUploadsForm';
import PersonalInformationForm from './PersonalInformationForm';
import AdditionalInformationForm from './AdditionalInformationForm';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

type RegistrationFormProps = {
  activePackageSlug: string;
  packages: {
    slug: string;
    title: string;
    price: number;
  }[];
}

export default function RegistrationForm({ packages, activePackageSlug }: RegistrationFormProps) {
  const [activeStep, setActiveStep] = useState(0);

  const { values, handleChange, setFieldValue } = useFormik<RegistrationFormType>({
    initialValues: {
      package: activePackageSlug,
      personalInformation: {
        salutation: 'mr',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      },
      additionalInformation: {
        dateOfBirth: '',
        placeOfBirth: '',
        address: '',
        zipCode: '',
        city: '',
        country: '',
        maritalStatus: 'single',
        profession: '',
      },
      nextOfKin: {
        fathersFirstName: '',
        fathersLastName: '',
        mothersFirstName: '',
        mothersLastName: '',
        motherMaidenName: '',
      },
      bankAndLawyer: {
        openingBalance: '',
        futureBalance: '',
        bankAppointment: false,
        lawyerAppointment: false,
      },
      travelInfo: {
        numberOfPeople: 0,
        arrivalDate: '',
        departureDate: '',
        rentalCar: 'small',
        requireRentalCar: false,
        airportTransfer: false,
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
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  const sections = [
    {
      title: 'Personal Information',
      component: <PersonalInformationForm values={values} handleChange={handleChange} setFieldValue={setFieldValue} />,
    },
    {
      title: 'Additional Information',
      component: <AdditionalInformationForm values={values} handleChange={handleChange} setFieldValue={setFieldValue} />,
    },
    {
      title: "Parent\'s Information",
      component: <PartnerInformationForm values={values} handleChange={handleChange} />,
    },
    {
      title: 'Bank & Lawyer',
      component: <BankxLawyerForm values={values} handleChange={handleChange} setFieldValue={setFieldValue} />,
    },
    {
      title: 'Document Uploads',
      component: <DocumentUploadsForm values={values} handleChange={handleChange} setFieldValue={setFieldValue} />,
    },
  ]

  const isFormValid = useMemo(() => {
    if (activeStep === 0) {
      return values.personalInformation.firstName && values.personalInformation.lastName && values.personalInformation.email && values.personalInformation.phoneNumber;
    } else if (activeStep === 1) {
      return values.additionalInformation.dateOfBirth && values.additionalInformation.placeOfBirth && values.additionalInformation.address && values.additionalInformation.zipCode && values.additionalInformation.city && values.additionalInformation.country && values.additionalInformation.maritalStatus && values.additionalInformation.profession;
    } else if (activeStep === 2) {
      return values.nextOfKin.fathersFirstName && values.nextOfKin.fathersLastName && values.nextOfKin.mothersFirstName && values.nextOfKin.mothersLastName && values.nextOfKin.motherMaidenName;
    } else if (activeStep === 3) {
      return values.travelInfo.arrivalDate && values.travelInfo.departureDate;
    } else if (activeStep === 4) {
      return values.documentUpload.main.passport && values.documentUpload.main.idFront && values.documentUpload.main.idBack && values.documentUpload.main.utilityBill && values.documentUpload.main.proofOfTravel;
    }

    return true;
  }, [activeStep, values])

  useEffect(() => {
    setFieldValue('package', activePackageSlug)
  }, [activePackageSlug])

  return (
    <Card className='max-w-xl w-full mx-auto p-6'>
      <form className='flex flex-col gap-4'>
        <div className="flex items-center gap-2">
          {sections.map((_, index) => (
            <div key={index} className={`w-full h-1 rounded-full ${activeStep === index ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <p className='font-medium'>{sections[activeStep].title}</p>
          <div className="flex items-center gap-2 rounded-sm px-3 py-2 w-max bg-primary text-primary-foreground shrink-0">
            <p className='font-normal'>Package:</p>
            <Popover>
              <PopoverTrigger className='cursor-pointer flex items-center gap-2'>
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
                    <p className='cursor-pointer w-full' onClick={() => setFieldValue('package', pack.slug)}>{pack.title} {pack.price ? `(€${pack.price.toLocaleString()})` : ''}</p>
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
            <Button variant='secondary' className='w-full shrink' type='button' onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
          )}
          {activeStep < sections.length - 1 && (
            <Button disabled={!isFormValid} className='w-full shrink' type='button' onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
          )}
          {activeStep === sections.length - 1 && (
            <Button disabled={!isFormValid} className='w-full shrink' type='submit'>Register</Button>
          )}
        </div>
      </form>
    </Card>
  )
}
