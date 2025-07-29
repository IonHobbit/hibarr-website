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

type ZapierWebhookType = 'ugla' | 'webinar' | 'consultation' | 'property-enquiry' | 'signup' | 'waitlist' | 'ebook';

export type ContactInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  language: string;
  utm: {
    source: string;
    medium: string;
    campaign: string;
    content: string;
    term: string;
    audience: string;
  }
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
  nextOfKin: {
    fathersFirstName: string;
    fathersLastName: string;
    mothersFirstName: string;
    mothersLastName: string;
    motherMaidenName: string;
  };
  bankAndLawyer: {
    bankAppointment: boolean | undefined;
    lawyerAppointment: boolean | undefined;
    openingBalance: string;
  };
  travelInfo: {
    areYouTravelingAlone: boolean | undefined;
    hotel: boolean;
    rentalCar: string;
    requireRentalCar: boolean;
    numberOfPeople: number;
    numberOfChildren: number;
    roomType: string;
    arrivalDate: string | undefined;
    departureDate: string | undefined;
    airportTransfer: boolean;
    comments: string;
  };
  documentUpload: {
    main: DocumentUpload;
    additional: Partial<Omit<DocumentUpload & { type: 'passport' | 'id', child?: boolean }, 'utilityBill'>>[];
  };
  paymentMethod: 'bankTransfer' | 'payOnline';
}

type ZapierPayload = ContactInfo & {
  type: ZapierWebhookType
}

type ZapierUglaPayload = Omit<ZapierPayload, 'phoneNumber'> & {
  type: 'ugla'
}

type ZapierEbookPayload = ZapierPayload & {
  type: 'ebook'
}

type ZapierWebinarPayload = ZapierPayload & {
  type: 'webinar'
}

type ZapierWaitlistPayload = ZapierPayload & {
  type: 'waitlist'
}

type ZapierSignupPayload = ZapierPayload & {
  isAlphaCashMember: boolean,
  type: 'signup',
  package: 'vip' | 'bank',
  alphaCashReferral?: string
}

type ZapierConsultationPayload = ZapierPayload & {
  type: 'consultation'
  clickID: string;
  score: number;
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

type PropertyListing = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  basicInfo: {
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    type: Array<{
      name: string;
      slug: string;
    }>;
    listingType: string;
    location: string;
  };
  externalFeatures: string[];
  internalFeatures: string[];
  agent: {
    _id: string;
    firstName: string;
    lastName: string;
  };
};

export type {
  PropertyType, RegistrationFormType,
  ZapierPayload, ZapierUglaPayload, ZapierWebinarPayload, ZapierWaitlistPayload, ZapierConsultationPayload, ZapierPropertyEnquiryPayload, ZapierSignupPayload, ZapierEbookPayload,
  PropertyListing
}