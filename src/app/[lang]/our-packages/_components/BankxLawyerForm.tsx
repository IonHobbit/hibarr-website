import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RegistrationFormType } from '@/types/main'
import { BankPackagesPage } from '@/types/sanity.types';
import { BankPackage } from './PackageCard';
import { PACKAGE_TYPE } from '@/lib/mockdata';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Textarea } from '@/components/ui/textarea';
import { Fragment } from 'react';

type BankxLawyerFormProps = {
  form: BankPackagesPage['form']
  activePackage: BankPackage
  values: RegistrationFormType;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFieldValue: (field: string, value: string | boolean | number | object) => void;
  setFieldTouched: (field: string, value: boolean) => void;
}

export default function BankxLawyerForm({ form, activePackage, values, errors, handleChange, setFieldValue, setFieldTouched }: BankxLawyerFormProps) {
  const { bankAndLawyerSection } = form!;

  const getMinimumDeposit = activePackage.minimumDeposit;

  const handleChangeInNumberOfPeople = (value: string) => {
    const number = Number(value);
    setFieldValue('travelInfo.numberOfPeople', number);
    setFieldValue('documentUpload.additional', Array.from({ length: number }, () => ({
      passport: null,
      proofOfTravel: null,
      idFront: null,
      idBack: null,
      type: 'passport',
    })));
  }

  const handleAreYouTravelingAlone = (value: boolean) => {
    setFieldValue('travelInfo.areYouTravelingAlone', value);
    if (!value) {
      handleChangeInNumberOfPeople('1');
    } else {
      setFieldValue('travelInfo.numberOfPeople', 0);
    }
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        {/* <div className="flex items-start gap-2">
          <Checkbox id="bankAndLawyer.bankAppointment" required checked={values.bankAndLawyer.bankAppointment} onClick={() => setFieldValue('bankAndLawyer.bankAppointment', !values.bankAndLawyer.bankAppointment)} />
          <label htmlFor="bankAndLawyer.bankAppointment" className="text-xs cursor-pointer">{bankAndLawyerSection?.bankAppointment?.replace('{amount}', getMinimumDeposit.toLocaleString()) || 'Do you require a bank appointment? (Minimum deposit is €{amount})'.replace('{amount}', getMinimumDeposit.toLocaleString())}</label>
        </div> */}

        <div className="flex items-center gap-4">
          <Icon icon='noto:bank' className='text-primary size-8' />
          <div className="flex flex-col items-start gap-2">
            <p className='text-sm'>{bankAndLawyerSection?.bankAppointment?.replace('{amount}', getMinimumDeposit.toLocaleString()) || 'Do you require a bank appointment? (Minimum deposit is €{amount})'.replace('{amount}', getMinimumDeposit.toLocaleString())}</p>
            <RadioGroup
              className='flex items-center gap-2'
              value={values.bankAndLawyer.bankAppointment ? 'yes' : 'no'}
              onValueChange={(value) => setFieldValue(`bankAndLawyer.bankAppointment`, value === 'yes')}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value='yes' title='Yes' />
                <p className='text-sm'>Yes</p>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value='no' title='No' />
                <p className='text-sm'>No</p>
              </div>
            </RadioGroup>
          </div>
        </div>
        {values.bankAndLawyer.bankAppointment && (
          <div className='flex flex-col gap-1'>
            <Input type='number' title={bankAndLawyerSection?.initialDeposit || 'Initial Deposit (€)'} min={getMinimumDeposit} name='bankAndLawyer.openingBalance' value={values.bankAndLawyer.openingBalance || getMinimumDeposit} onChange={handleChange} onBlur={() => setFieldTouched('bankAndLawyer.openingBalance', true)} />
            {errors.openingBalance && <p className='text-xs text-red-500'>Minimum deposit is €{getMinimumDeposit.toLocaleString()}</p>}
          </div>
        )}

        <div className="flex items-center gap-4">
          <Icon icon='fluent-emoji:balance-scale' className='text-primary size-8' />
          <div className="flex flex-col items-start gap-2">
            <p className='text-sm'>{bankAndLawyerSection?.lawyerAppointment || 'Do you require a lawyers appointment?'}</p>
            <RadioGroup
              className='flex items-center gap-2'
              value={values.bankAndLawyer.lawyerAppointment ? 'yes' : 'no'}
              onValueChange={(value) => setFieldValue(`bankAndLawyer.lawyerAppointment`, value === 'yes')}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value='yes' title='Yes' />
                <p className='text-sm'>Yes</p>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value='no' title='No' />
                <p className='text-sm'>No</p>
              </div>
            </RadioGroup>
          </div>
        </div>
        {/* <div className="flex items-start gap-2">
          <Checkbox id="bankAndLawyer.lawyerAppointment" required checked={values.bankAndLawyer.lawyerAppointment} onClick={() => setFieldValue('bankAndLawyer.lawyerAppointment', !values.bankAndLawyer.lawyerAppointment)} />
          <label htmlFor="bankAndLawyer.lawyerAppointment" className="text-xs cursor-pointer">{bankAndLawyerSection?.lawyerAppointment || 'Do you require a lawyers appointment?'}</label>
        </div> */}
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-medium'>{bankAndLawyerSection?.travelDetails?.title || 'Travel Details'}</p>
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-2 gap-3'>
            <Input required type="datetime-local" name='travelInfo.arrivalDate' title={bankAndLawyerSection?.travelDetails?.arrivalDate || 'Arrival Date + Time'} value={values.travelInfo.arrivalDate} onChange={handleChange} onBlur={() => setFieldTouched('travelInfo.arrivalDate', true)} error={errors.arrivalDate} />
            <Input required type="datetime-local" name='travelInfo.departureDate' title={bankAndLawyerSection?.travelDetails?.departureDate || 'Departure Date + Time'} value={values.travelInfo.departureDate} onChange={handleChange} onBlur={() => setFieldTouched('travelInfo.departureDate', true)} error={errors.departureDate} />
          </div>
          <div className="flex items-center gap-2">
            <p className='text-sm'>Are you traveling alone?</p>
            <RadioGroup
              className='flex items-center gap-2'
              value={values.travelInfo.areYouTravelingAlone !== undefined ? (values.travelInfo.areYouTravelingAlone ? 'yes' : 'no') : undefined}
              onValueChange={(value) => handleAreYouTravelingAlone(value === 'yes')}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value='yes' title='Yes' />
                <p className='text-sm'>Yes</p>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value='no' title='No' />
                <p className='text-sm'>No</p>
              </div>
            </RadioGroup>
          </div>
          {
            (!values.travelInfo.areYouTravelingAlone && values.travelInfo.areYouTravelingAlone !== undefined) &&
            <Fragment>
              <div className='flex flex-col gap-1.5'>
                <Select
                  value={values.travelInfo.numberOfPeople.toString()}
                  onValueChange={(value) => handleChangeInNumberOfPeople(value)}>
                  <SelectTrigger title='How many people are traveling with you?' className='w-full'>
                    <SelectValue placeholder='Select an option' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>1 person</SelectItem>
                    <SelectItem value='2'>2 people</SelectItem>
                    <SelectItem value='3'>3 people</SelectItem>
                    <SelectItem value='4'>4 people</SelectItem>
                    <SelectItem value='5'>5 people</SelectItem>
                  </SelectContent>
                </Select>
                {(PACKAGE_TYPE[values.package as keyof typeof PACKAGE_TYPE] !== PACKAGE_TYPE['basic-package'] && values.travelInfo.numberOfPeople > 1) && (
                  <p className='text-xs text-primary'>**Please note that the costs for the hotel rooms will only be covered for <span className='font-bold'>you and one other person.</span></p>
                )}
              </div>
              <Textarea title='Comments' rows={6} placeholder='Preferred room setup? Pets or other needs?' value={values.travelInfo.comments} onChange={(e) => setFieldValue('travelInfo.comments', e.target.value)} />
            </Fragment>
          }
          {/* {
            (!values.travelInfo.areYouTravelingAlone && values.travelInfo.areYouTravelingAlone !== undefined) && (
              <div className="grid grid-cols-2 gap-3">
                <div className={cn(values.travelInfo.numberOfPeople < 1 && 'col-span-2')}>
                  {
                    (!values.travelInfo.areYouTravelingAlone && values.travelInfo.areYouTravelingAlone !== undefined) && (
                      <Input truncateTitle type='number' required min={0} title={bankAndLawyerSection?.travelDetails?.numberOfPeople || 'How many people with you?'} name='travelInfo.numberOfPeople' value={values.travelInfo.numberOfPeople} onChange={handleChangeInNumberOfPeople} />
                    )
                  }
                </div>
                {
                  values.travelInfo.numberOfPeople > 0 && (
                    <Input type='number' required min={0} max={values.travelInfo.numberOfPeople} title={'How many are children?'} name='travelInfo.numberOfChildren' value={values.travelInfo.numberOfChildren} onChange={handleChangeInNumberOfChildren} />
                  )
                }
              </div>
            )
          } */}
          <div className="flex items-start gap-2">
            <Checkbox id="travelInfo.airportTransfer" required checked={values.travelInfo.airportTransfer} onClick={() => setFieldValue('travelInfo.airportTransfer', !values.travelInfo.airportTransfer)} />
            <label htmlFor="travelInfo.airportTransfer" className="text-xs cursor-pointer">
              {bankAndLawyerSection?.additionalServices?.airportTransfer + ` (${PACKAGE_TYPE[values.package as keyof typeof PACKAGE_TYPE] === PACKAGE_TYPE['basic-package'] ? 'You will bear the cost' : 'Included in your package'})` ||
                `Do you require Airport Transfer? (${PACKAGE_TYPE[values.package as keyof typeof PACKAGE_TYPE] === PACKAGE_TYPE['basic-package'] ? 'You will bear the cost' : 'Included in your package'})`}
            </label>
          </div>
          <div className="flex items-start gap-2">
            <Checkbox id="travelInfo.requireRentalCar" required checked={values.travelInfo.requireRentalCar} onClick={() => setFieldValue('travelInfo.requireRentalCar', !values.travelInfo.requireRentalCar)} />
            <label htmlFor="travelInfo.requireRentalCar" className="text-xs cursor-pointer">{bankAndLawyerSection?.travelDetails?.requireRentalCar || 'Do you require a rental car? (Minimum rental period is 3 days)'}</label>
          </div>
          {values.travelInfo.requireRentalCar && (
            <Select value={values.travelInfo.rentalCar} onValueChange={(value) => setFieldValue('travelInfo.rentalCar', value)}>
              <SelectTrigger title={bankAndLawyerSection?.travelDetails?.carSize || 'What size of car do you require?'} className='w-full'>
                <SelectValue placeholder='Small, Medium, Large or Jeep' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Small'>Small</SelectItem>
                <SelectItem value='Medium'>Medium</SelectItem>
                <SelectItem value='Large'>Large</SelectItem>
                <SelectItem value='Jeep'>Jeep</SelectItem>
                <SelectItem value='Luxury'>Luxury</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </div>
  )
}
