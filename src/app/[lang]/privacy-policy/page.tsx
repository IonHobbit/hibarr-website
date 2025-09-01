import { Metadata } from 'next';
import { fetchSanityData } from '@/lib/third-party/sanity.client';
import { Locale } from '@/lib/i18n-config';
import { PrivacyPolicy } from '@/types/sanity.types';
import PrivacyPolicyContent from './_components/PrivacyPolicyContent';
import { generateSEOMetadata } from '@/lib/utils';
import { translate } from '@/lib/translation';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;

  const privacyPolicyData = await fetchSanityData<PrivacyPolicy>(
    `*[_type == "privacyPolicy" && language == $lang][0]`,
    { lang }
  );

  return generateSEOMetadata(privacyPolicyData.seo);
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  const privacyPolicyData = await fetchSanityData<PrivacyPolicy>(
    `*[_type == "privacyPolicy" && language == $lang][0]`,
    { lang }
  );

  const lastUpdated = (await translate('Last updated:')).text


  return (
    <div className="min-h-screen bg-background">
      <PrivacyPolicyContent privacyPolicyData={privacyPolicyData} lastUpdated={lastUpdated} />
    </div>
  );
}
