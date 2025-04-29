import { Dictionary } from "@/lib/dictionary";

type NavigationItem = Dictionary['navigation'][number]

type PropertyType = {
  id: string;
  name: string;
  price: number;
  location: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  size: number;
  type: string;
  features: string[];
  description: string;
  labels: string[];
  statuses: string;
  link: string;
}

type ZapierWebhookType = 'ugla' | 'webinar' | 'consultation' | 'property-enquiry' | 'signup';

type ContactInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

type DocumentUpload = {
  passport: string;
  idFront: string;
  idBack: string;
  utilityBill: string;
  proofOfTravel: string;
}

type RegistrationFormType = {
  package: string;
  personalInformation: ContactInfo & {
    salutation: string;
  };
  additionalInformation: {
    dateOfBirth: string;
    placeOfBirth: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    maritalStatus: string;
    profession: string;
  };
  nextOfKin: {
    fathersFirstName: string;
    fathersLastName: string;
    mothersFirstName: string;
    mothersLastName: string;
    motherMaidenName: string;
  };
  bankAndLawyer: {
    bankAppointment: boolean;
    lawyerAppointment: boolean;
    openingBalance: string;
    futureBalance: string;
  };
  travelInfo: {
    rentalCar: string;
    requireRentalCar: boolean;
    numberOfPeople: number;
    arrivalDate: string;
    departureDate: string;
    airportTransfer: boolean;
  };
  documentUpload: {
    main: DocumentUpload;
    additional: Partial<Omit<DocumentUpload & { type: 'passport' | 'id' }, 'utilityBill'>>[];
  };
}

type ZapierPayload = ContactInfo & {
  type: ZapierWebhookType
}

type ZapierUglaPayload = Omit<ZapierPayload, 'phoneNumber'> & {
  type: 'ugla'
}

type ZapierWebinarPayload = ZapierPayload & {
  type: 'webinar'
}

type ZapierSignupPayload = ZapierPayload & {
  isAlphaCashMember: boolean,
  type: 'signup',
  package: 'vip' | 'bank',
  alphaCashReferral?: string
}

type ZapierConsultationPayload = Omit<ZapierPayload, 'phoneNumber'> & {
  type: 'consultation'
  consultationInfo: {
    country: string
    interestedIn: string[]
    budget: string
    period: string
    language: string
  }
}

type ZapierPropertyEnquiryPayload = ZapierPayload & ContactInfo & {
  type: 'property-enquiry'
  propertyId: string
  comment: string
}

export type {
  NavigationItem, PropertyType, RegistrationFormType,
  ZapierPayload, ZapierUglaPayload, ZapierWebinarPayload, ZapierConsultationPayload, ZapierPropertyEnquiryPayload, ZapierSignupPayload
}