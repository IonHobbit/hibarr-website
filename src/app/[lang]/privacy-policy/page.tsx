import { Metadata } from 'next';
import { fetchSanityData } from '@/lib/third-party/sanity.client';
import { Locale } from '@/lib/i18n-config';
import { PrivacyPolicy } from '@/types/sanity.types';
import PrivacyPolicyContent from './_components/PrivacyPolicyContent';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;

  try {
    const privacyPolicyData = await fetchSanityData<PrivacyPolicy>(
      `*[_type == "privacyPolicy" && language == $lang][0]`,
      { lang }
    );

    return {
      title: privacyPolicyData?.seo?.metaTitle || privacyPolicyData?.title || 'Privacy Policy - HIBARR Trading Ltd.',
      description: privacyPolicyData?.seo?.metaDescription || 'Privacy Policy for HIBARR Trading Ltd.. Learn how we collect, use, and protect your personal information.',
      keywords: privacyPolicyData?.seo?.keywords || 'privacy policy, data protection, HIBARR Trading Ltd., North Cyprus, real estate',
      openGraph: {
        title: privacyPolicyData?.seo?.openGraph?.title || privacyPolicyData?.seo?.metaTitle || 'Privacy Policy - HIBARR Trading Ltd.',
        description: privacyPolicyData?.seo?.openGraph?.description || privacyPolicyData?.seo?.metaDescription || 'Privacy Policy for HIBARR Trading Ltd.. Learn how we collect, use, and protect your personal information.',
        type: 'website',
        locale: lang,
        siteName: 'HIBARR Trading Ltd.',
        images: privacyPolicyData?.seo?.openGraph?.image ? [privacyPolicyData.seo.openGraph.image] : undefined,
      },
    };
  } catch (error) {
    // Fallback metadata if Sanity fetch fails
    return {
      title: 'Privacy Policy - HIBARR Trading Ltd.',
      description: 'Privacy Policy for HIBARR Trading Ltd.. Learn how we collect, use, and protect your personal information.',
    };
  }
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  const privacyPolicyData = await fetchSanityData<PrivacyPolicy>(
    `*[_type == "privacyPolicy" && language == $lang][0]`,
    { lang }
  );


  return (
    <div className="min-h-screen bg-background">
      <PrivacyPolicyContent privacyPolicyData={privacyPolicyData} />
    </div>
  );
}
