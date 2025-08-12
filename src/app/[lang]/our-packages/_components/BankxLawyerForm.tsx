import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RegistrationFormType } from '@/types/main'
import { BankPackagesPage } from '@/types/sanity.types';
import { BankPackage } from './PackageCard';
import { PACKAGE_TYPE } from '@/lib/constants';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Textarea } from '@/components/ui/textarea';
import { roomTypeOptions } from '@/lib/options';

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

  const getMinimumDeposit = activePackage.minimumDeposit || 0;

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

  // const handleAreYouTravelingAlone = (value: boolean) => {
  //   setFieldValue('travelInfo.areYouTravelingAlone', value);
  //   if (!value) {
  //     handleChangeInNumberOfPeople('1');
  //   } else {
  //     setFieldValue('travelInfo.numberOfPeople', 0);
  //   }
  // }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-7'>
        <div className="flex items-center gap-4">
          <Icon icon='noto:bank' className='text-primary size-8' />
          <div className="flex flex-col items-start gap-2">
            <p className='text-base'><span className='font-semibold'>{bankAndLawyerSection?.bankAppointment?.split('?')[0] + '?' || 'Bank Appointment?'}</span> {bankAndLawyerSection?.bankAppointment?.split('?')[1] && `${bankAndLawyerSection?.bankAppointment?.split('?')[1].replace('{amount}', getMinimumDeposit.toLocaleString())}` || `(Min.deposit is €${getMinimumDeposit.toLocaleString()})`}  <span className="text-destructive text-xs">*</span></p>
            <RadioGroup
              className='flex items-center gap-2'
              value={values.bankAndLawyer.bankAppointment !== undefined ? (values.bankAndLawyer.bankAppointment ? 'yes' : 'no') : undefined}
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
            <p className='text-base'><span className='font-semibold'>{bankAndLawyerSection?.lawyerAppointment || 'Legal Appointment?'}</span> <span className="text-destructive text-xs">*</span></p>
            <RadioGroup
              className='flex items-center gap-2'
              value={values.bankAndLawyer.lawyerAppointment !== undefined ? (values.bankAndLawyer.lawyerAppointment ? 'yes' : 'no') : undefined}
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
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-medium text-lg'>{bankAndLawyerSection?.travelDetails?.title || 'Travel Details'}</p>
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-2 gap-3'>
            <Input required type="datetime-local" titleClassName='font-semibold text-black' name='travelInfo.arrivalDate' title={bankAndLawyerSection?.travelDetails?.arrivalDate || 'Arrival Date/Time'} value={values.travelInfo.arrivalDate} onChange={handleChange} onBlur={() => setFieldTouched('travelInfo.arrivalDate', true)} error={errors.arrivalDate} />
            <Input required type="datetime-local" titleClassName='font-semibold text-black' name='travelInfo.departureDate' title={bankAndLawyerSection?.travelDetails?.departureDate || 'Departure Date/Time'} value={values.travelInfo.departureDate} onChange={handleChange} onBlur={() => setFieldTouched('travelInfo.departureDate', true)} error={errors.departureDate} />
          </div>
          {/* {activePackage.price == 0 &&
            <Fragment>
              <div className="flex items-center gap-2">
                <p className='text-base'>{bankAndLawyerSection?.travelDetails?.areYouTravellingAlone || 'Are you traveling alone?'} <span className="text-destructive text-xs">*</span></p>
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
                      <SelectTrigger title={cn(bankAndLawyerSection?.travelDetails?.numberOfPeople || 'How many in your group?')} className='w-full'>
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
          } */}
          <div className='grid grid-cols-2 gap-3'>
            <Select
              value={values.travelInfo.numberOfPeople.toString()}
              onValueChange={(value) => handleChangeInNumberOfPeople(value)}>
              <SelectTrigger title={bankAndLawyerSection?.travelDetails?.whoIsTravellingWithYou || 'Who is traveling with you?'} className='w-full'>
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
              <SelectTrigger title={bankAndLawyerSection?.travelDetails?.numberOfChildren || 'Kids under 18?'} className='w-full'>
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
          <Select
            value={values.travelInfo.roomType}
            onValueChange={(value) => setFieldValue('travelInfo.roomType', value)}>
            <SelectTrigger title={'How many rooms?'} className='w-full'>
              <SelectValue placeholder='Select an option' />
            </SelectTrigger>
            <SelectContent>
              {roomTypeOptions.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea title={bankAndLawyerSection?.travelDetails?.comments || 'Comments'} rows={6} placeholder='Preferred room setup? Pets or other needs?' value={values.travelInfo.comments} onChange={(e) => setFieldValue('travelInfo.comments', e.target.value)} />
          <p className='text-base'>{bankAndLawyerSection?.travelDetails?.doYouNeed || 'Do you need:'}</p>
          <div className="flex items-center gap-2">
            <Checkbox id="travelInfo.hotel" required checked={values.travelInfo.hotel} onClick={() => setFieldValue('travelInfo.hotel', !values.travelInfo.hotel)} />
            <label htmlFor="travelInfo.hotel" className="text-base cursor-pointer">
              {bankAndLawyerSection?.travelDetails?.hotel + ` (${PACKAGE_TYPE[values.package as keyof typeof PACKAGE_TYPE] === PACKAGE_TYPE['basic-package'] ? 'You will bear the cost' : 'Included'})`
                || `Hotel? (${PACKAGE_TYPE[values.package as keyof typeof PACKAGE_TYPE] === PACKAGE_TYPE['basic-package'] ? 'You will bear the cost' : 'Included'})`}
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="travelInfo.airportTransfer" required checked={values.travelInfo.airportTransfer} onClick={() => setFieldValue('travelInfo.airportTransfer', !values.travelInfo.airportTransfer)} />
            <label htmlFor="travelInfo.airportTransfer" className="text-base cursor-pointer">
              {bankAndLawyerSection?.additionalServices?.airportTransfer + ` (${PACKAGE_TYPE[values.package as keyof typeof PACKAGE_TYPE] === PACKAGE_TYPE['basic-package'] ? 'You will bear the cost' : 'Included'})` ||
                `Airport Transfer? (${PACKAGE_TYPE[values.package as keyof typeof PACKAGE_TYPE] === PACKAGE_TYPE['basic-package'] ? 'You will bear the cost' : 'Included'})`}
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="travelInfo.requireRentalCar" required checked={values.travelInfo.requireRentalCar} onClick={() => setFieldValue('travelInfo.requireRentalCar', !values.travelInfo.requireRentalCar)} />
            <label htmlFor="travelInfo.requireRentalCar" className="text-base cursor-pointer">{bankAndLawyerSection?.travelDetails?.requireRentalCar || 'Rental Car? (Extra: rental period min. 3 days)'}</label>
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
