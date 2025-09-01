'use client';

import { Icon } from '@iconify/react';
import { PrivacyPolicy } from '@/types/sanity.types';
import { PortableText } from '@portabletext/react';

type PrivacyPolicyContentProps = {
  privacyPolicyData: PrivacyPolicy | null;
  lastUpdated: string;
};

export default function PrivacyPolicyContent({ privacyPolicyData, lastUpdated }: PrivacyPolicyContentProps) {
  const currentDate = privacyPolicyData?._updatedAt
    ? new Date(privacyPolicyData._updatedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    : new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });


  if (!privacyPolicyData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {privacyPolicyData.title}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-primary-foreground/80">
              <Icon icon="mdi:calendar" className="size-4" />
              <span>{lastUpdated} {currentDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Render the content using PortableText */}
            <div className="max-w-none space-y-6">
              <PortableText
                value={privacyPolicyData.content}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-base !font-normal mb-1">{children}</p>
                    ),
                    divider: ({ children }) => (
                      <div className="border-b border-gray-200 my-4">{children}</div>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-xl !font-semibold mt-3 mb-6 !font-sans">{children}</h4>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="list-disc pl-4">{children}</ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal pl-4">{children}</ol>
                    ),
                  },
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
