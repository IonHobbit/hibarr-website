import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RegistrationFormType } from '@/types/main';
import { BankPackagesPage } from '@/types/sanity.types';
import dynamic from 'next/dynamic';

const PhoneInput = dynamic(() => import('@/components/ui/phone-input').then(mod => mod.PhoneInput), {
  loading: () => <Input placeholder="Loading..." />
})

const salutations = [
  {
    label: 'Mr',
    value: 'Mr.',
  },
  {
    label: 'Mrs',
    value: 'Mrs.',
  },
  {
    label: 'Ms',
    value: 'Ms.',
  },
]

type PersonalInformationFormProps = {
  form: BankPackagesPage['form']
  values: RegistrationFormType;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (field: string, value: string) => void;
  setFieldTouched: (field: string, value: boolean) => void;
}

export default function PersonalInformationForm({ form, values, errors, handleChange, setFieldValue, setFieldTouched }: PersonalInformationFormProps) {
  const { personalInformationSection } = form!;

  return (
    <div className='flex flex-col gap-3'>
      <div className="grid lg:grid-cols-8 gap-2">
        <div className='lg:col-span-2 overflow-hidden'>
          <Select defaultValue={values.personalInformation.salutation} onValueChange={(value) => setFieldValue('personalInformation.salutation', value)}>
            <SelectTrigger error={errors?.salutation} title={personalInformationSection?.salutation || 'Salutation'} className='w-full'>
              <SelectValue placeholder=' Mr, Mrs, Ms, Dr' />
            </SelectTrigger>
            <SelectContent>
              {salutations.map((salutation) => (
                <SelectItem key={salutation.value} value={salutation.value}>
                  {salutation.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='lg:col-span-3'>
          <Input required type='text' error={errors?.firstName} title={personalInformationSection?.firstName || 'First Name'} name='personalInformation.firstName' value={values.personalInformation.firstName} onChange={handleChange} placeholder='John' onBlur={() => setFieldTouched('personalInformation.firstName', true)} />
        </div>
        <div className='lg:col-span-3'>
          <Input required type='text' error={errors?.lastName} title={personalInformationSection?.lastName || 'Last Name'} name='personalInformation.lastName' value={values.personalInformation.lastName} onChange={handleChange} placeholder='Doe' onBlur={() => setFieldTouched('personalInformation.lastName', true)} />
        </div>
      </div>
      <Input required type='email' error={errors?.email} title={personalInformationSection?.email || 'Email'} name='personalInformation.email' value={values.personalInformation.email} onChange={handleChange} placeholder='john.doe@example.com' onBlur={() => setFieldTouched('personalInformation.email', true)} />
      <PhoneInput name='personalInformation.phoneNumber' required title={personalInformationSection?.phone || 'Mobile'} value={values.personalInformation.phoneNumber} onChange={(value) => setFieldValue('personalInformation.phoneNumber', value)} placeholder='Enter your phone number' onBlur={() => setFieldTouched('personalInformation.phoneNumber', true)} />
    </div>
  )
}
