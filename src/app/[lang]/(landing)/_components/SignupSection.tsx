import { cn } from "@/lib/utils";
import { HomePage } from "@/types/sanity.types";
import SignupForm from "./SignupForm";
import { translateBatch } from "@/lib/translation";

type SignupSectionProps = {
  data: HomePage['freebieSignupSection'];
}

export default async function SignupSection({ data }: SignupSectionProps) {
  const [vipPackage, bankPackage] = await translateBatch(['VIP Package', 'Bank Package']);
  const [registeredTitle, registeredDescription] = await translateBatch(['Welcome to Hibarr!', 'You just took the first step to unlock your investment potential! We will reach out via email shortly.']);
  const [joinTitle, joinDescription] = await translateBatch(['Join us today!', 'Fill out the form below to join us today!']);
  const [alphaCashMember, alphaCashMemberDescription, alphaCashReferralLink] = await translateBatch(['Are you an Alpha Cash Club member?', 'Alpha Cash members get special priviledges and discounts.', 'Enter your Alpha Cash Referral link']);
  const [packagePlaceholder, alphaCashReferralPlaceholder] = await translateBatch(['Select Package', 'Enter your Alpha Cash Referral link']);
  const [phoneNumber, email, lastName, firstName] = await translateBatch(['Phone Number', 'Email', 'Last Name', 'First Name', 'Package']);

  const placeholders = {
    package: packagePlaceholder.text,
    alphaCashReferral: alphaCashReferralPlaceholder.text,
  }

  const form = {
    phoneNumber: phoneNumber.text,
    email: email.text,
    lastName: lastName.text,
    firstName: firstName.text,
    package: packagePlaceholder.text,
  }

  const text = {
    form: form,
    vipPackage: vipPackage.text,
    bankPackage: bankPackage.text,
    placeholders: placeholders,
    registeredTitle: registeredTitle.text,
    registeredDescription: registeredDescription.text,
    joinTitle: joinTitle.text,
    joinDescription: joinDescription.text,
    alphaCashMember: alphaCashMember.text,
    alphaCashMemberDescription: alphaCashMemberDescription.text,
    alphaCashReferralLink: alphaCashReferralLink.text,
  }

  return (
    <section id='signup' className={cn('bg-primary flex flex-col transition-all duration-300 min-h-[30dvh]')}>
      <div className="section h-full grow max-w-screen-sm">
        <SignupForm data={data} text={text} />
      </div>
    </section>
  )
}
