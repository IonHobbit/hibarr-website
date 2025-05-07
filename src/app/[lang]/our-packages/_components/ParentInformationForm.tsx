import { Input } from '@/components/ui/input'
import { RegistrationFormType } from '@/types/main'
import { BankPackagesPage } from '@/types/sanity.types';

type ParentInformationFormProps = {
  form: BankPackagesPage['form']
  values: RegistrationFormType;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldTouched: (field: string, value: boolean) => void;
}

export default function ParentInformationForm({ form, values, errors, handleChange, setFieldTouched }: ParentInformationFormProps) {
  const { parentsInformationSection } = form!;

  return (
    <div className='flex flex-col gap-2'>
      <div className="grid lg:grid-cols-2 gap-3">
        <Input type='text' required error={errors.fathersFirstName} title={parentsInformationSection?.fathersFirstName || "Father's First Name"} name='nextOfKin.fathersFirstName' value={values.nextOfKin.fathersFirstName} onChange={handleChange} placeholder='John' onBlur={() => setFieldTouched('nextOfKin.fathersFirstName', true)} />
        <Input type='text' required error={errors.fathersLastName} title={parentsInformationSection?.fathersLastName || "Father's Last Name"} name='nextOfKin.fathersLastName' value={values.nextOfKin.fathersLastName} onChange={handleChange} placeholder='Doe' onBlur={() => setFieldTouched('nextOfKin.fathersLastName', true)} />
      </div>
      <div className="grid lg:grid-cols-2 gap-3">
        <Input type='text' required error={errors.mothersFirstName} title={parentsInformationSection?.mothersFirstName || "Mother's First Name"} name='nextOfKin.mothersFirstName' value={values.nextOfKin.mothersFirstName} onChange={handleChange} placeholder='Jane' onBlur={() => setFieldTouched('nextOfKin.mothersFirstName', true)} />
        <Input type='text' required error={errors.mothersLastName} title={parentsInformationSection?.mothersLastName || "Mother's Last Name"} name='nextOfKin.mothersLastName' value={values.nextOfKin.mothersLastName} onChange={handleChange} placeholder='Smith' onBlur={() => setFieldTouched('nextOfKin.mothersLastName', true)} />
      </div>
      <Input type='text' required error={errors.motherMaidenName} title={parentsInformationSection?.mothersMaidenName || "Mother's Maiden Name"} name='nextOfKin.motherMaidenName' value={values.nextOfKin.motherMaidenName} onChange={handleChange} placeholder='Doe' onBlur={() => setFieldTouched('nextOfKin.motherMaidenName', true)} />
    </div>
  )
}
