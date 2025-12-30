import type { Locale } from '@/lib/i18n-config';

export type ExpandedFaqItem = {
  question: string;
  answer: string;
};

export type ExpandedPackageContent = {
  description: string;
  whoIsItFor: string;
  benefits: string[];
  faqs: ExpandedFaqItem[];
};

export type ExpandedPartnerContent = {
  about: string;
  trustSignals: string[];
  investorBenefits: string;
  history: string;
  faqs: ExpandedFaqItem[];
};

export type ExpandedTestimonial = {
  clientName: string;
  comment: string;
  date?: string;
  role?: string;
  image?: string;
};

export type ExpandedLeadershipProfile = {
  bio: string;
  expertise: string[];
  achievements: string;
};

export type ExpandedContent = {
  packages: Record<string, ExpandedPackageContent>;
  partners: {
    nearEastGroup: ExpandedPartnerContent;
  };
  testimonials: ExpandedTestimonial[];
  leadership: {
    rabih: ExpandedLeadershipProfile;
  };
};

export type ExpandedContentByLocale = Record<Locale, ExpandedContent>;
