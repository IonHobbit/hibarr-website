import { Locale } from "@/lib/i18n-config";

export interface RegistrationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  language: Locale;
  utmInfo?: UtmInfo;
}

// UTM information interface
export interface UtmInfo {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}