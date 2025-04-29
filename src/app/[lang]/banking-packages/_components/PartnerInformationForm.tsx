import { Input } from '@/components/ui/input'
import { RegistrationFormType } from '@/types/main'

type PartnerInformationFormProps = {
  values: RegistrationFormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PartnerInformationForm({ values, handleChange }: PartnerInformationFormProps) {
  return (
    <div className='flex flex-col gap-2'>
      <div className="grid grid-cols-2 gap-3">
        <Input type='text' required title="Father's First Name" name='nextOfKin.fathersFirstName' value={values.nextOfKin.fathersFirstName} onChange={handleChange} placeholder=' John' />
        <Input type='text' required title="Father's Last Name" name='nextOfKin.fathersLastName' value={values.nextOfKin.fathersLastName} onChange={handleChange} placeholder=' Doe' />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input type='text' required title="Mother's First Name" name='nextOfKin.mothersFirstName' value={values.nextOfKin.mothersFirstName} onChange={handleChange} placeholder=' Jane' />
        <Input type='text' required title="Mother's Last Name" name='nextOfKin.mothersLastName' value={values.nextOfKin.mothersLastName} onChange={handleChange} placeholder=' Smith' />
      </div>
      <Input type='text' required title="Mother's Maiden Name" name='nextOfKin.motherMaidenName' value={values.nextOfKin.motherMaidenName} onChange={handleChange} placeholder=' Doe' />
    </div>
  )
}
