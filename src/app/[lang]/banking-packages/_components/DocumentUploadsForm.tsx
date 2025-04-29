import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { RegistrationFormType } from '@/types/main'
import React, { Fragment } from 'react'

type DocumentUploadsFormProps = {
  values: RegistrationFormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (field: string, value: string | File | undefined) => void;
}

export default function DocumentUploadsForm({ values, setFieldValue }: DocumentUploadsFormProps) {
  return (
    <div className='flex flex-col gap-3'>
      <p className='font-medium'>Main Traveller Documents</p>
      <div className='flex flex-col gap-2'>
        <div className="grid grid-cols-2 gap-2 items-end">
          <Input type='file' required value={values.documentUpload.main.passport} title='Passport' onChange={(e) => setFieldValue('documentUpload.main.passport', e.target.files?.[0])} />
          <Input type='file' required value={values.documentUpload.main.utilityBill} title='Utility Bill' onChange={(e) => setFieldValue('documentUpload.main.utilityBill', e.target.files?.[0])} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Input type='file' required value={values.documentUpload.main.idFront} title='ID (Front)' onChange={(e) => setFieldValue('documentUpload.main.idFront', e.target.files?.[0])} />
          <Input type='file' required value={values.documentUpload.main.idBack} title='ID (Back)' onChange={(e) => setFieldValue('documentUpload.main.idBack', e.target.files?.[0])} />
        </div>
        <Input type='file' required value={values.documentUpload.main.proofOfTravel} title='Proof of Travel (with dates, times, flight number & airport)' onChange={(e) => setFieldValue('documentUpload.main.proofOfTravel', e.target.files?.[0])} />
      </div>

      {values.travelInfo.numberOfPeople > 0 && (
        <Fragment>
          <p className='font-medium'>Additional Traveller Documents</p>
          <div className='flex flex-col gap-4'>
            {Array.from({ length: values.travelInfo.numberOfPeople }).map((_, index) => (
              <div key={index} className='flex flex-col gap-2 border rounded-md p-4'>
                <div className="flex gap-4 justify-between">
                  <p className='font-medium'>Traveller {index + 1} Documents</p>
                  <div className="flex items-center gap-2">
                    <p className='text-sm'>Upload their</p>
                    <RadioGroup
                      className='flex items-center gap-2'
                      defaultValue={values.documentUpload.additional[index].type}
                      onValueChange={(value) => setFieldValue(`documentUpload.additional[${index}].type`, value)}>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value='passport' title='Passport' />
                        <p className='text-sm'>Passport</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value='id' title='ID' />
                        <p className='text-sm'>ID</p>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <Input required type='file' value={values.documentUpload.additional[index].proofOfTravel} title='Proof of Travel' onChange={(e) => setFieldValue(`documentUpload.additional[${index}].proofOfTravel`, e.target.files?.[0])} />
                {values.documentUpload.additional[index].type == 'passport' &&
                  <Input required type='file' value={values.documentUpload.additional[index].passport} title='Passport' onChange={(e) => setFieldValue(`documentUpload.additional[${index}].passport`, e.target.files?.[0])} />
                }
                {values.documentUpload.additional[index].type == 'id' &&
                  <div className="grid grid-cols-2 gap-2 items-end">
                    <Input required type='file' value={values.documentUpload.additional[index].idFront} title='ID (Front)' onChange={(e) => setFieldValue(`documentUpload.additional[${index}].idFront`, e.target.files?.[0])} />
                    <Input required type='file' value={values.documentUpload.additional[index].idBack} title='ID (Back)' onChange={(e) => setFieldValue(`documentUpload.additional[${index}].idBack`, e.target.files?.[0])} />
                  </div>
                }
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  )
}
