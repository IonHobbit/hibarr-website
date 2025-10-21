import { Locale } from "@/lib/i18n-config";

export interface RegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  language: Locale;
  utmInfo?: UtmInfo;
}

export interface WebinarRegistrationRequest extends RegistrationRequest {
  meetingId: string;
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

export interface ConsultationRegistrationRequest extends RegistrationRequest {
  score?: number;
  country?: string
  interestedIn?: string[]
  budget?: string
  period?: string
  message?: string
}

export interface WebinarRegistrationResponse {
  registrant_id: string;
  id: number;
  topic: string;
  start_time: string;
  join_url: string;
  occurrences: Array<{
    occurrence_id: string;
    start_time: string;
    duration: number;
    status: string;
  }>;
  isStartingSoon: boolean;
  hasAlreadyStarted: boolean;
}

// UTM information interface
export interface UtmInfo {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}