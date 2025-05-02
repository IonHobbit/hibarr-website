import { SelectItem } from '@/components/ui/select'
import { SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { RegistrationFormType } from '@/types/main'
import { BankPackagesPage } from '@/types/sanity.types';

const maritalStatus = [
  {
    label: 'Single',
    value: 'Single',
  },
  {
    label: 'Married',
    value: 'Married',
  },
  {
    label: 'Divorced',
    value: 'Divorced',
  },
  {
    label: 'Widowed',
    value: 'Widowed',
  },
]

type AdditionalInformationFormProps = {
  form: BankPackagesPage['form']
  values: RegistrationFormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (field: string, value: string) => void;
}

export default function AdditionalInformationForm({ form, values, handleChange, setFieldValue }: AdditionalInformationFormProps) {
  const { additionalInformationSection } = form!;

  return (
    <div className='flex flex-col gap-3'>
      <div className='grid grid-cols-2 gap-3'>
        <Input type="date" required title={additionalInformationSection?.dateOfBirth || 'Date of Birth'} name='additionalInformation.dateOfBirth'
          value={values.additionalInformation.dateOfBirth}
          onChange={handleChange} />
        <Input type="text" required title={additionalInformationSection?.placeOfBirth || 'Place of Birth'} name='additionalInformation.placeOfBirth'
          placeholder='eg. Berlin, Germany'
          value={values.additionalInformation.placeOfBirth}
          onChange={handleChange} />
      </div>
      <Input type='text' required title={additionalInformationSection?.address || 'Current Street Address'} name='additionalInformation.address'
        value={values.additionalInformation.address}
        onChange={handleChange} placeholder='Enter a valid address' />
      <div className='grid grid-cols-2 lg:grid-cols-8 gap-2'>
        <div className='col-span-3'>
          <Input type="Text" required title={additionalInformationSection?.city || 'City'} name='additionalInformation.city'
            placeholder='eg. Berlin'
            value={values.additionalInformation.city}
            onChange={handleChange} />
        </div>
        <div className='col-span-3'>
          <Input type="Text" required title={additionalInformationSection?.country || 'Country'} name='additionalInformation.country'
            placeholder='eg. Germany'
            value={values.additionalInformation.country}
            onChange={handleChange} />
        </div>
        <div className='col-span-2 overflow-hidden'>
          <Input required title={additionalInformationSection?.zipCode || 'ZIP code'} name='additionalInformation.zipCode'
            placeholder='eg. 12345'
            value={values.additionalInformation.zipCode}
            onChange={handleChange} />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-3'>
        <Select required defaultValue={values.additionalInformation.maritalStatus}
          onValueChange={(value) => setFieldValue('additionalInformation.maritalStatus', value)}>
          <SelectTrigger title={additionalInformationSection?.maritalStatus || 'Marital Status'} className='w-full'>
            <SelectValue placeholder='Marital status' />
          </SelectTrigger>
          <SelectContent>
            {maritalStatus.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input type="text" required title={additionalInformationSection?.profession || 'Profession'} placeholder='eg. Engineer' name='additionalInformation.profession'
          value={values.additionalInformation.profession} onChange={handleChange} />
      </div>
    </div>
  )
}
