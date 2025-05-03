import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RegistrationFormType } from '@/types/main'
import { BankPackagesPage } from '@/types/sanity.types';

const minimumDeposit = {
  'Free Package': 1000,
  'VIP Banking Package': 500,
  'Real Estate Package': 100,
}

type BankxLawyerFormProps = {
  form: BankPackagesPage['form']
  values: RegistrationFormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (field: string, value: string | boolean | number | object) => void;
}

export default function BankxLawyerForm({ form, values, handleChange, setFieldValue }: BankxLawyerFormProps) {
  const { bankAndLawyerSection } = form!;

  const getMinimumDeposit = minimumDeposit[values.package as keyof typeof minimumDeposit];

  const handleChangeInNumberOfPeople = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    const number = Number(e.target.value);
    setFieldValue('documentUpload.additional', Array.from({ length: number }, () => ({
      passport: null,
      proofOfTravel: null,
      idFront: null,
      idBack: null,
      type: 'passport',
    })));
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <div className="flex items-start gap-2">
          <Checkbox id="bankAndLawyer.bankAppointment" required checked={values.bankAndLawyer.bankAppointment} onClick={() => setFieldValue('bankAndLawyer.bankAppointment', !values.bankAndLawyer.bankAppointment)} />
          <label htmlFor="bankAndLawyer.bankAppointment" className="text-xs cursor-pointer">{bankAndLawyerSection?.bankAppointment?.replace('{amount}', getMinimumDeposit.toLocaleString()) || 'Do you require a bank appointment? (Minimum deposit is €{amount})'.replace('{amount}', getMinimumDeposit.toLocaleString())}</label>
        </div>
        {values.bankAndLawyer.bankAppointment && (
          <div className='grid grid-cols-2 gap-3'>
            <Input type='number' title={bankAndLawyerSection?.initialDeposit || 'Initial Deposit (€)'} min={getMinimumDeposit} name='bankAndLawyer.openingBalance' value={values.bankAndLawyer.openingBalance || getMinimumDeposit} onChange={handleChange} />
            <Input type='number' title={bankAndLawyerSection?.amountToBeTransferred || 'Amount to be transferred (€)'} name='bankAndLawyer.futureBalance' value={values.bankAndLawyer.futureBalance} onChange={handleChange} />
          </div>
        )}
        <div className="flex items-start gap-2">
          <Checkbox id="bankAndLawyer.lawyerAppointment" required checked={values.bankAndLawyer.lawyerAppointment} onClick={() => setFieldValue('bankAndLawyer.lawyerAppointment', !values.bankAndLawyer.lawyerAppointment)} />
          <label htmlFor="bankAndLawyer.lawyerAppointment" className="text-xs cursor-pointer">{bankAndLawyerSection?.lawyerAppointment || 'Do you require a lawyers appointment?'}</label>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-medium'>{bankAndLawyerSection?.travelDetails?.title || 'Travel Details'}</p>
        <div className='flex flex-col gap-4'>
          <Input type='number' required max={5} min={0} title={bankAndLawyerSection?.travelDetails?.numberOfPeople || 'How many people are you traveling with?'} name='travelInfo.numberOfPeople' value={values.travelInfo.numberOfPeople} onChange={handleChangeInNumberOfPeople} />
          <div className='grid grid-cols-2 gap-3'>
            <Input required type="datetime-local" name='travelInfo.arrivalDate' title={bankAndLawyerSection?.travelDetails?.arrivalDate || 'Arrival Date + Time'} value={values.travelInfo.arrivalDate} onChange={handleChange} />
            <Input required type="datetime-local" name='travelInfo.departureDate' title={bankAndLawyerSection?.travelDetails?.departureDate || 'Departure Date + Time'} value={values.travelInfo.departureDate} onChange={handleChange} />
          </div>
          <div className="flex items-start gap-2">
            <Checkbox id="travelInfo.requireRentalCar" required checked={values.travelInfo.requireRentalCar} onClick={() => setFieldValue('travelInfo.requireRentalCar', !values.travelInfo.requireRentalCar)} />
            <label htmlFor="travelInfo.requireRentalCar" className="text-xs cursor-pointer">{bankAndLawyerSection?.travelDetails?.requireRentalCar || 'Do you require a rental car? (Minimum rental period is 3 days)'}</label>
          </div>
          {values.travelInfo.requireRentalCar && (
            <Select value={values.travelInfo.rentalCar} onValueChange={(value) => setFieldValue('travelInfo.rentalCar', value)}>
              <SelectTrigger title={bankAndLawyerSection?.travelDetails?.carSize || 'What size of car do you require?'} className='w-full'>
                <SelectValue placeholder=' Small, Medium, Large' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Small'>Small</SelectItem>
                <SelectItem value='Medium'>Medium</SelectItem>
                <SelectItem value='Large'>Large</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-medium'>{bankAndLawyerSection?.additionalServices?.title || 'Additional Services'}</p>
        <div className='flex flex-col gap-3'>
          <div className="flex items-start gap-2">
            <Checkbox id="travelInfo.airportTransfer" required checked={values.travelInfo.airportTransfer} onClick={() => setFieldValue('travelInfo.airportTransfer', !values.travelInfo.airportTransfer)} />
            <label htmlFor="travelInfo.airportTransfer" className="text-xs cursor-pointer">
              {bankAndLawyerSection?.additionalServices?.airportTransfer + ` (${values.package === 'Free Package' ? 'You will bear the cost' : 'Included in your package'})` ||
                `Do you require Airport Transfer? (${values.package === 'Free Package' ? 'You will bear the cost' : 'Included in your package'})`}
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
