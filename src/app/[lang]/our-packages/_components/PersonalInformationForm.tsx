import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RegistrationFormType } from '@/types/main';
import { BankPackagesPage } from '@/types/sanity.types';
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
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (field: string, value: string) => void;
}

export default function PersonalInformationForm({ form, values, handleChange, setFieldValue }: PersonalInformationFormProps) {
  const { personalInformationSection } = form!;

  return (
    <div className='flex flex-col gap-3'>
      <div className="grid grid-cols-2 lg:grid-cols-8 gap-2">
        <div className='col-span-2 overflow-hidden'>
          <Select defaultValue={values.personalInformation.salutation} onValueChange={(value) => setFieldValue('personalInformation.salutation', value)}>
            <SelectTrigger title={personalInformationSection?.salutation || 'Salutation'} className='w-full'>
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
        <div className='col-span-3'>
          <Input required type='text' title={personalInformationSection?.firstName || 'First Name'} name='personalInformation.firstName' value={values.personalInformation.firstName} onChange={handleChange} placeholder=' John' />
        </div>
        <div className='col-span-3'>
          <Input required type='text' title={personalInformationSection?.lastName || 'Last Name'} name='personalInformation.lastName' value={values.personalInformation.lastName} onChange={handleChange} placeholder=' Doe' />
        </div>
      </div>
      <Input required type='email' title={personalInformationSection?.email || 'Email'} name='personalInformation.email' value={values.personalInformation.email} onChange={handleChange} placeholder=' john.doe@example.com' />
      <Input required type='tel' title={personalInformationSection?.phone || 'Phone Number'} name='personalInformation.phoneNumber' value={values.personalInformation.phoneNumber} onChange={handleChange} placeholder=' +905555555555' />
    </div>
  )
}
