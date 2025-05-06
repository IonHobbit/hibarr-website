import { Input } from '@/components/ui/input'
import { RegistrationFormType } from '@/types/main'
import { BankPackagesPage } from '@/types/sanity.types';

type ParentInformationFormProps = {
  form: BankPackagesPage['form']
  values: RegistrationFormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ParentInformationForm({ form, values, handleChange }: ParentInformationFormProps) {
  const { parentsInformationSection } = form!;

  return (
    <div className='flex flex-col gap-2'>
      <div className="grid lg:grid-cols-2 gap-3">
        <Input type='text' required title={parentsInformationSection?.fathersFirstName || "Father's First Name"} name='nextOfKin.fathersFirstName' value={values.nextOfKin.fathersFirstName} onChange={handleChange} placeholder='John' />
        <Input type='text' required title={parentsInformationSection?.fathersLastName || "Father's Last Name"} name='nextOfKin.fathersLastName' value={values.nextOfKin.fathersLastName} onChange={handleChange} placeholder='Doe' />
      </div>
      <div className="grid lg:grid-cols-2 gap-3">
        <Input type='text' required title={parentsInformationSection?.mothersFirstName || "Mother's First Name"} name='nextOfKin.mothersFirstName' value={values.nextOfKin.mothersFirstName} onChange={handleChange} placeholder='Jane' />
        <Input type='text' required title={parentsInformationSection?.mothersLastName || "Mother's Last Name"} name='nextOfKin.mothersLastName' value={values.nextOfKin.mothersLastName} onChange={handleChange} placeholder='Smith' />
      </div>
      <Input type='text' required title={parentsInformationSection?.mothersMaidenName || "Mother's Maiden Name"} name='nextOfKin.motherMaidenName' value={values.nextOfKin.motherMaidenName} onChange={handleChange} placeholder='Doe' />
    </div>
  )
}
