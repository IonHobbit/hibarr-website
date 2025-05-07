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
import pluralize from 'pluralize';

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
      child: false,
    })));
  }

  const handleChangeInNumberOfChildren = (value: string) => {
    const numberOfChildren = Number(value);
    setFieldValue('travelInfo.numberOfChildren', numberOfChildren);

    // Get the number of adults (excluding children)
    const numberOfAdults = values.travelInfo.numberOfPeople;

    // Create the new array with adults first, then children
    const newAdditional = [
      // Keep existing adult entries
      ...values.documentUpload.additional.slice(0, numberOfAdults),
      // Add or update children entries
      ...Array.from({ length: numberOfChildren }, () => ({
        child: true,
        passport: null,
        proofOfTravel: null,
        idFront: null,
        idBack: null,
        type: 'passport',
      }))
    ];

    setFieldValue('documentUpload.additional', newAdditional);
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
            <p className='text-sm'><span className='font-semibold'>{'Bank Appointment?'}</span> (Min. deposit is €{getMinimumDeposit.toLocaleString()})</p>
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
          <div className='flex flex-col gap-1.5'>
            <Input type='number' title={bankAndLawyerSection?.initialDeposit || 'Initial Deposit (€)'} min={getMinimumDeposit} name='bankAndLawyer.openingBalance' value={values.bankAndLawyer.openingBalance || getMinimumDeposit} onChange={handleChange} onBlur={() => setFieldTouched('bankAndLawyer.openingBalance', true)} />
            {errors.openingBalance && <p className='text-xs text-red-500'>Minimum deposit is €{getMinimumDeposit.toLocaleString()}</p>}
          </div>
        )}

        <div className="flex items-center gap-4">
          <Icon icon='fluent-emoji:balance-scale' className='text-primary size-8' />
          <div className="flex flex-col items-start gap-2">
            <p className='text-sm'><span className='font-semibold'>{'Legal Appointment?'}</span></p>
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
            <Input required type="datetime-local" titleClassName='font-semibold text-black' name='travelInfo.arrivalDate' title={'Arrival Date/Time'} value={values.travelInfo.arrivalDate} onChange={handleChange} onBlur={() => setFieldTouched('travelInfo.arrivalDate', true)} error={errors.arrivalDate} />
            <Input required type="datetime-local" titleClassName='font-semibold text-black' name='travelInfo.departureDate' title={'Departure Date/Time'} value={values.travelInfo.departureDate} onChange={handleChange} onBlur={() => setFieldTouched('travelInfo.departureDate', true)} error={errors.departureDate} />
          </div>
          {activePackage.price == 0 &&
            <Fragment>
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
                      <SelectTrigger title='How many in your group?' className='w-full'>
                        <SelectValue placeholder='Select an option' />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, index) => (
                          <SelectItem key={index} value={(index + 1).toString()}>{index + 1} {pluralize('person', index + 1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </Fragment>
              }
            </Fragment>
          }
          {
            activePackage.price > 0 &&
            <div className='grid grid-cols-2 gap-3'>
              <Select
                value={values.travelInfo.numberOfPeople.toString()}
                onValueChange={(value) => handleChangeInNumberOfPeople(value)}>
                <SelectTrigger title='Who is traveling with you?' className='w-full'>
                  <SelectValue placeholder='Select an option' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='0'>I am coming alone</SelectItem>
                  <SelectItem value='1'>I am coming with 1 person</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={values.travelInfo.numberOfChildren.toString()}
                onValueChange={(value) => handleChangeInNumberOfChildren(value)}>
                <SelectTrigger title='Kids under 18?' className='w-full'>
                  <SelectValue placeholder='Select an option' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='0'>No Kids</SelectItem>
                  <SelectItem value='1'>1 Kid</SelectItem>
                  <SelectItem value='2'>2 Kids</SelectItem>
                  <SelectItem value='3'>3 Kids</SelectItem>
                  <SelectItem value='4'>4 Kids</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
          <Textarea title='Comments' rows={6} placeholder='Preferred room setup? Pets or other needs?' value={values.travelInfo.comments} onChange={(e) => setFieldValue('travelInfo.comments', e.target.value)} />
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
