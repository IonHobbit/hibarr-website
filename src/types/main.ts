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

type ZapierWebhookType = 'ugla' | 'webinar' | 'consultation'

type ZapierPayload = {
  type: ZapierWebhookType
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

type ZapierUglaPayload = Omit<ZapierPayload, 'phoneNumber'> & {
  type: 'ugla'
}

type ZapierWebinarPayload = ZapierPayload & {
  type: 'webinar'
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

export type { NavigationItem, PropertyType, ZapierPayload, ZapierUglaPayload, ZapierWebinarPayload, ZapierConsultationPayload }