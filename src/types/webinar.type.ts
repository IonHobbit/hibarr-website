import { Locale } from "@/lib/i18n-config";

export interface RegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  language: Locale;
  utmInfo?: UtmInfo;
}

export interface SignupRegistrationRequest extends RegistrationRequest {
  package: 'vip' | 'bank';
  isAlphaCashMember?: boolean;
  alphaCashReferral?: string;
}

export interface PropertyEnquiryRegistrationRequest extends RegistrationRequest {
  comment?: string;
  property: {
    id: string;
    title: string;
    slug: string;
  }
}

// UTM information interface
export interface UtmInfo {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}