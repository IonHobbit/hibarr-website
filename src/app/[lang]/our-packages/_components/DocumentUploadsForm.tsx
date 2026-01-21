import { FileInput } from '@/components/ui/file-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PACKAGE_TYPE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { RegistrationFormType } from '@/types/main'
import { BankPackagesPage } from '@/types/sanity.types';
import { Fragment } from 'react';

type DocumentUploadsFormProps = {
  form: BankPackagesPage['form']
  values: RegistrationFormType;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (field: string, value: string | File | undefined) => void;
  setFieldTouched: (field: string, value: boolean) => void;
}

export default function DocumentUploadsForm({ form, values, errors, setFieldValue, setFieldTouched }: DocumentUploadsFormProps) {
  const { documentUploadsSection } = form!;

  const accept = 'image/png,image/jpeg,image/jpg,image/webp';

  return (
    <div className='flex flex-col gap-3'>
      <p className='font-medium'>{documentUploadsSection?.mainTravellerDocuments?.title || 'Main Traveller Documents'}</p>
      <div className='flex flex-col gap-2'>
        <FileInput accept={accept} required name='proofOfTravel' fileValue={values.documentUpload.main.proofOfTravel} title='Proof of Travel (with dates, times, flight number & airport)' folderName='banking-packages-form-entries' onUpload={(value) => setFieldValue('documentUpload.main.proofOfTravel', value)} onBlur={() => setFieldTouched('documentUpload.main.proofOfTravel', true)} error={errors.proofOfTravel} />
        <div className="grid lg:grid-cols-2 gap-2 items-end">
          {/* {!values.documentUpload.main.idFront && ( */}
          <FileInput accept={accept} required={!values.documentUpload.main.idFront} name='passport' fileValue={values.documentUpload.main.passport} title='Passport' folderName='banking-packages-form-entries' onUpload={(value) => setFieldValue('documentUpload.main.passport', value)} onBlur={() => setFieldTouched('documentUpload.main.passport', true)} error={errors.passport} />
          {/* )} */}
          <div className={cn(values.documentUpload.main.idFront && 'col-span-2')}>
            <FileInput accept={accept} required name='utilityBill' fileValue={values.documentUpload.main.utilityBill} title='Utility Bill' folderName='banking-packages-form-entries' onUpload={(value) => setFieldValue('documentUpload.main.utilityBill', value)} onBlur={() => setFieldTouched('documentUpload.main.utilityBill', true)} error={errors.utilityBill} />
          </div>
        </div>
        {/* {!values.documentUpload.main.passport && ( */}
        <div className="grid lg:grid-cols-2 gap-2">
          <FileInput accept={accept} required={!values.documentUpload.main.passport} name='idFront' fileValue={values.documentUpload.main.idFront} title='ID (Front)' folderName='banking-packages-form-entries' onUpload={(value) => setFieldValue('documentUpload.main.idFront', value)} onBlur={() => setFieldTouched('documentUpload.main.idFront', true)} error={errors.idFront} />
          <FileInput accept={accept} required={!values.documentUpload.main.passport} name='idBack' fileValue={values.documentUpload.main.idBack} title='ID (Back)' folderName='banking-packages-form-entries' onUpload={(value) => setFieldValue('documentUpload.main.idBack', value)} onBlur={() => setFieldTouched('documentUpload.main.idBack', true)} error={errors.idBack} />
        </div>
        {/* )} */}
      </div>

      {values.documentUpload.additional.length > 0 && (
        <Fragment>
          <p className='font-medium'>{documentUploadsSection?.additionalTravellerDocuments?.title || 'Additional Traveller Documents'}</p>
          <div className='flex flex-col gap-4'>
            {values.documentUpload.additional.map((item, index) => (
              <div key={index} className='flex flex-col gap-2 border rounded-md p-4'>
                <div className="flex gap-4 justify-between">
                  <p className='font-medium'>{item.child ? 'Child' : 'Adult'} {item.type == 'passport' ? 'Passport' : 'ID'}</p>
                  <div className="flex items-center gap-2">
                    <RadioGroup
                      className='flex items-center gap-2'
                      defaultValue={item.type}
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
                  </div>
                </div>
                {item.type == 'passport' &&
                  <FileInput accept={accept} required fileValue={item.passport} name={`passport-${index}`} title={documentUploadsSection?.additionalTravellerDocuments?.passport || 'Passport'} folderName='banking-packages-form-entries' onUpload={(value) => setFieldValue(`documentUpload.additional[${index}].passport`, value)} />
                }
                {item.type == 'id' &&
                  <div className="grid grid-cols-2 gap-2 items-end">
                    <FileInput accept={accept} required fileValue={item.idFront} name={`idFront-${index}`} title={documentUploadsSection?.additionalTravellerDocuments?.idFront || 'ID (Front)'} folderName='banking-packages-form-entries' onUpload={(value) => setFieldValue(`documentUpload.additional[${index}].idFront`, value)} />
                    <FileInput accept={accept} required fileValue={item.idBack} name={`idBack-${index}`} title={documentUploadsSection?.additionalTravellerDocuments?.idBack || 'ID (Back)'} folderName='banking-packages-form-entries' onUpload={(value) => setFieldValue(`documentUpload.additional[${index}].idBack`, value)} />
                  </div>
                }
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
                <RadioGroupItem value='bankTransfer' id='bankTransfer' title='Bank Transfer' />
                <label className='text-sm cursor-pointer' htmlFor='bankTransfer'>Bank Transfer</label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value='payOnline' id='payOnline' title='Pay Online' />
                <label className='text-sm cursor-pointer' htmlFor='payOnline'>Pay Online</label>
              </div>
            </RadioGroup>
          </div>
        </div>
      )}
    </div>
  )
}
