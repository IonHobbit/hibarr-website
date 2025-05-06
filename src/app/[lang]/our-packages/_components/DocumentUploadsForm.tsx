import { FileInput } from '@/components/ui/file-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PACKAGE_TYPE } from '@/lib/mockdata';
import { cn } from '@/lib/utils';
import { RegistrationFormType } from '@/types/main'
import { BankPackagesPage } from '@/types/sanity.types';
import { Fragment } from 'react';

type DocumentUploadsFormProps = {
  form: BankPackagesPage['form']
  values: RegistrationFormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (field: string, value: string | File | undefined) => void;
}

export default function DocumentUploadsForm({ form, values, setFieldValue }: DocumentUploadsFormProps) {
  const { documentUploadsSection } = form!;

  return (
    <div className='flex flex-col gap-3'>
      <p className='font-medium'>{documentUploadsSection?.mainTravellerDocuments?.title || 'Main Traveller Documents'}</p>
      <div className='flex flex-col gap-2'>
        <FileInput accept='image/png,image/jpeg,image/jpg,image/webp,application/pdf' required name='proofOfTravel' fileValue={values.documentUpload.main.proofOfTravel} title='Proof of Travel (with dates, times, flight number & airport)' onUpload={(value) => setFieldValue('documentUpload.main.proofOfTravel', value)} />
        <div className="grid lg:grid-cols-2 gap-2 items-end">
          {!values.documentUpload.main.idFront && (
            <FileInput accept='image/png,image/jpeg,image/jpg,image/webp,application/pdf' required name='passport' fileValue={values.documentUpload.main.passport} title='Passport' onUpload={(value) => setFieldValue('documentUpload.main.passport', value)} />
          )}
          <div className={cn(values.documentUpload.main.idFront && 'col-span-2')}>
            <FileInput accept='image/png,image/jpeg,image/jpg,image/webp,application/pdf' required name='utilityBill' fileValue={values.documentUpload.main.utilityBill} title='Utility Bill' onUpload={(value) => setFieldValue('documentUpload.main.utilityBill', value)} />
          </div>
        </div>
        {!values.documentUpload.main.passport && (
          <div className="grid lg:grid-cols-2 gap-2">
            <FileInput accept='image/png,image/jpeg,image/jpg,image/webp,application/pdf' required name='idFront' fileValue={values.documentUpload.main.idFront} title='ID (Front)' onUpload={(value) => setFieldValue('documentUpload.main.idFront', value)} />
            <FileInput accept='image/png,image/jpeg,image/jpg,image/webp,application/pdf' required name='idBack' fileValue={values.documentUpload.main.idBack} title='ID (Back)' onUpload={(value) => setFieldValue('documentUpload.main.idBack', value)} />
          </div>
        )}
      </div>

      {values.travelInfo.numberOfPeople > 0 && (
        <Fragment>
          <p className='font-medium'>{documentUploadsSection?.additionalTravellerDocuments?.title || 'Additional Traveller Documents'}</p>
          <div className='flex flex-col gap-4'>
            {Array.from({ length: values.travelInfo.numberOfPeople }).map((_, index) => (
              <div key={index} className='flex flex-col gap-2 border rounded-md p-4'>
                <div className="flex gap-4 justify-between">
                  <p className='font-medium'>Traveller {index + 2} Passport</p>
                  {/* <div className="flex items-center gap-2">
                    <p className='text-sm'>{documentUploadsSection?.additionalTravellerDocuments?.additionalTravellerRadios?.title || 'Upload their'}</p>
                    <RadioGroup
                      className='flex items-center gap-2'
                      defaultValue={values.documentUpload.additional[index].type}
                      onValueChange={(value) => setFieldValue(`documentUpload.additional[${index}].type`, value)}>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value='passport' title='Passport' />
                        <p className='text-sm'>{documentUploadsSection?.additionalTravellerDocuments?.additionalTravellerRadios?.passport || 'Passport'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value='id' title='ID' />
                        <p className='text-sm'>{documentUploadsSection?.additionalTravellerDocuments?.additionalTravellerRadios?.id || 'ID'}</p>
                      </div>
                    </RadioGroup>
                  </div> */}
                </div>
                {/* <FileInput required fileValue={values.documentUpload.additional[index].proofOfTravel} name={`proofOfTravel-${index}`} title={documentUploadsSection?.additionalTravellerDocuments?.proofOfTravel || 'Proof of Travel'} onUpload={(value) => setFieldValue(`documentUpload.additional[${index}].proofOfTravel`, value)} /> */}
                {values.documentUpload.additional[index].type == 'passport' &&
                  <FileInput accept='image/png,image/jpeg,image/jpg,image/webp,application/pdf' required fileValue={values.documentUpload.additional[index].passport} name={`passport-${index}`} title={documentUploadsSection?.additionalTravellerDocuments?.passport || 'Passport'} onUpload={(value) => setFieldValue(`documentUpload.additional[${index}].passport`, value)} />
                }
                {/* {values.documentUpload.additional[index].type == 'id' &&
                  <div className="grid grid-cols-2 gap-2 items-end">
                    <FileInput required fileValue={values.documentUpload.additional[index].idFront} name={`idFront-${index}`} title={documentUploadsSection?.additionalTravellerDocuments?.idFront || 'ID (Front)'} onUpload={(value) => setFieldValue(`documentUpload.additional[${index}].idFront`, value)} />
                    <FileInput required fileValue={values.documentUpload.additional[index].idBack} name={`idBack-${index}`} title={documentUploadsSection?.additionalTravellerDocuments?.idBack || 'ID (Back)'} onUpload={(value) => setFieldValue(`documentUpload.additional[${index}].idBack`, value)} />
                  </div>
                } */}
              </div>
            ))}
          </div>
        </Fragment>
      )}

      {PACKAGE_TYPE[values.package as keyof typeof PACKAGE_TYPE] !== PACKAGE_TYPE['basic-package'] && (
        <div className="flex flex-col gap-2">
          <p className='font-medium'>Payment Method</p>
          <div className="flex items-center gap-2">
            <RadioGroup
              className='flex items-center gap-2'
              defaultValue={values.paymentMethod}
              onValueChange={(value) => setFieldValue('paymentMethod', value)}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value='bankTransfer' title='Bank Transfer' />
                <p className='text-sm'>Bank Transfer</p>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value='payOnline' title='Pay Online' />
                <p className='text-sm'>Pay Online</p>
              </div>
            </RadioGroup>
          </div>
        </div>
      )}
    </div>
  )
}
