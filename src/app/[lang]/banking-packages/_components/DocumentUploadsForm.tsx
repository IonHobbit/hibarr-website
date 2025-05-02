import { FileInput } from '@/components/ui/file-input';
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
          <FileInput required name='passport' fileValue={values.documentUpload.main.passport} title='Passport' onUpload={(value) => setFieldValue('documentUpload.main.passport', value)} />
          <FileInput required name='utilityBill' fileValue={values.documentUpload.main.utilityBill} title='Utility Bill' onUpload={(value) => setFieldValue('documentUpload.main.utilityBill', value)} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FileInput required name='idFront' fileValue={values.documentUpload.main.idFront} title='ID (Front)' onUpload={(value) => setFieldValue('documentUpload.main.idFront', value)} />
          <FileInput required name='idBack' fileValue={values.documentUpload.main.idBack} title='ID (Back)' onUpload={(value) => setFieldValue('documentUpload.main.idBack', value)} />
        </div>
        <FileInput required name='proofOfTravel' fileValue={values.documentUpload.main.proofOfTravel} title='Proof of Travel (with dates, times, flight number & airport)' onUpload={(value) => setFieldValue('documentUpload.main.proofOfTravel', value)} />
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
                <FileInput required fileValue={values.documentUpload.additional[index].proofOfTravel} name={`proofOfTravel-${index}`} title='Proof of Travel' onUpload={(value) => setFieldValue(`documentUpload.additional[${index}].proofOfTravel`, value)} />
                {values.documentUpload.additional[index].type == 'passport' &&
                  <FileInput required fileValue={values.documentUpload.additional[index].passport} name={`passport-${index}`} title='Passport' onUpload={(value) => setFieldValue(`documentUpload.additional[${index}].passport`, value)} />
                }
                {values.documentUpload.additional[index].type == 'id' &&
                  <div className="grid grid-cols-2 gap-2 items-end">
                    <FileInput required fileValue={values.documentUpload.additional[index].idFront} name={`idFront-${index}`} title='ID (Front)' onUpload={(value) => setFieldValue(`documentUpload.additional[${index}].idFront`, value)} />
                    <FileInput required fileValue={values.documentUpload.additional[index].idBack} name={`idBack-${index}`} title='ID (Back)' onUpload={(value) => setFieldValue(`documentUpload.additional[${index}].idBack`, value)} />
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
