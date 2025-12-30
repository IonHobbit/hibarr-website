import type { Locale } from '@/lib/i18n-config';
import { i18n } from '@/lib/i18n-config';

import { EXPANDED_PACKAGES_BY_LOCALE } from '@/lib/content/expanded/packages';
import { EXPANDED_RABIH_BY_LOCALE } from '@/lib/content/expanded/leadership/rabih';
import { EXPANDED_NEAR_EAST_GROUP_BY_LOCALE } from '@/lib/content/expanded/partners/near-east-group';
import { EXPANDED_TESTIMONIALS_BY_LOCALE } from '@/lib/content/expanded/testimonials';

export type {
  ExpandedFaqItem,
  ExpandedPackageContent,
  ExpandedPartnerContent,
  ExpandedTestimonial,
  ExpandedLeadershipProfile,
  ExpandedContent,
  ExpandedContentByLocale,
} from '@/lib/content/expanded-content.types';

import type { ExpandedContent, ExpandedContentByLocale } from '@/lib/content/expanded-content.types';

const buildExpandedContentForLocale = (locale: Locale): ExpandedContent => ({
  packages: EXPANDED_PACKAGES_BY_LOCALE[locale],
  partners: {
    nearEastGroup: EXPANDED_NEAR_EAST_GROUP_BY_LOCALE[locale],
  },
  testimonials: EXPANDED_TESTIMONIALS_BY_LOCALE[locale],
  leadership: {
    rabih: EXPANDED_RABIH_BY_LOCALE[locale],
  },
});

export const EXPANDED_CONTENT = Object.fromEntries(
  i18n.locales.map((locale) => [locale, buildExpandedContentForLocale(locale)]),
) as ExpandedContentByLocale;
