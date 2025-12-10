import { Metadata } from 'next'
import React, { Fragment } from 'react'
import dynamic from 'next/dynamic'
import { translate } from '@/lib/translation'

const AnimatedHeroSection = dynamic(() => import('./_components/AnimatedHeroSection'), {
  loading: () => <div className="min-h-screen bg-black" />
})

const AnimatedAboutSection = dynamic(() => import('./_components/AnimatedAboutSection'), {
  loading: () => <div className="min-h-[50vh] bg-white" />
})

const AnimatedWhySection = dynamic(() => import('./_components/AnimatedWhySection'), {
  loading: () => <div className="min-h-screen bg-black" />
})

const AnimatedPartnershipSection = dynamic(() => import('./_components/AnimatedPartnershipSection'), {
  loading: () => <div className="min-h-[25vh] bg-black" />
})

export const metadata: Metadata = {
  title: 'News Central Corp',
  description: 'Building Excellence in North Cyprus – NCC Partnership.',
}

export default async function NewsCentralCorp() {
  const coreServices = [
    {
      name: 'Asset Growth',
      description: 'Premium residential developments with modern amenities and sustainable design principles.',
      icon: 'mdi:home-city'
    },
    {
      name: 'Asset Protection',
      description: 'Premium residential developments with modern amenities and sustainable design principles.',
      icon: 'mdi:key'
    }
  ]

  const partnershipBenefits = [
    {
      title: 'Market Intelligence',
      description: 'Through our partnership with News Central Corp, you\'ll gain access to timely, well-researched insights on local and global real estate trends, helping you make smarter, data-driven investment decisions.',
      icon: 'mdi:chart-line'
    },
    {
      title: 'Risk Mitigation',
      description: 'NCC\'s expertise in economic, legal, and regulatory environments allows us to help you identify and navigate potential risks in the North Cyprus property market before they impact your investment.',
      icon: 'mdi:shield-alert'
    },
    {
      title: 'Opportunity Access',
      description: 'Stay ahead of emerging opportunities. With NCC\'s network and intelligence tools, we can alert you to high-potential real estate projects, undervalued assets, and upcoming market shifts.',
      icon: 'mdi:lightbulb-on'
    },
    {
      title: 'Asset Protection Guidance',
      description: 'Our collaboration with NCC gives you strategic insights on asset protection solutions, from gold-backed wealth preservation strategies to region-specific financial planning advice, helping you secure your real estate investment long term.',
      icon: 'mdi:safe'
    }
  ];

  const whyCards = [
    {
      title: 'Proven Track Record',
      content: 'With over 15 years in the information sourcing and financial intelligence sector, News Central Corp (NCC) has consistently delivered timely, high-impact insights that help clients seize market opportunities and protect their assets. Their extensive history of client success and information-driven outcomes highlights their reliability and value as a strategic partner.',
      items: [
        '15+ years of industry experience',
        'Proven success in supporting investment decisions across multiple sectors (funds, real estate, crypto, energy, environment)',
        'Strong client retention and satisfaction rates',
        'Track record of delivering actionable intelligence with market relevance'
      ]
    },
    {
      title: 'Quality Standards',
      content: 'NCC is committed to the highest standards of information accuracy, relevance, and confidentiality. Their expert team carefully curates, verifies, and analyzes global and regional data to provide insights that meet the decision-making needs of sophisticated investors and business leaders.',
      items: [
        'Rigorous data sourcing and validation processes',
        'Expertise in financial, economic, legal, and geopolitical intelligence',
        'Confidential client support and advisory frameworks',
        'Commitment to delivering actionable, opportunity-driven insights'
      ]
    },
    {
      title: 'Local Expertise',
      content: 'As a company with both regional focus and international reach, NCC combines local market knowledge with a global understanding of financial trends. Their nuanced perspective helps clients navigate regulatory, economic, and investment environments with clarity and confidence.',
      items: [
        'Deep understanding of regional dynamics in Germany and Europe',
        'Access to global market intelligence and trends',
        'Strong network of regional experts and sector specialists',
        'Tailored insights for both local investors and international stakeholders'
      ]
    },
    {
      title: 'Innovation & Technology',
      content: 'NCC leverages cutting-edge research tools, financial analysis platforms, and digital content delivery systems to ensure clients stay ahead of the curve. Their focus on technology and innovation enhances the speed, quality, and depth of their information products.',
      items: [
        'Use of AI-driven analytics for market monitoring',
        'Real-time data delivery for emerging opportunities',
        'Digital platforms for tailored client updates',
        'Continuous investment in research technology and methodologies'
      ]
    }
  ];

  const colors = {
    primary: '#D7B369',
    secondary: '#000000',
    tertiary: '#FFFFFF',
  }

  // Translate all text content
  const [
    heroTitle,
    heroSubtitle,
    aboutTitle,
    aboutDescription,
    whyTitle,
    whySubtitle,
    tagline,
    benefitsTitle,
    translatedCoreServices,
    translatedPartnershipBenefits,
    translatedWhyCards
  ] = await Promise.all([
    // Hero section
    translate('News Central Corp').then(res => res.text),
    translate('Secure Your Assets with Smart, Strategic Investment Planning.').then(res => res.text),

    // About section
    translate('About News Central Corp').then(res => res.text),
    translate('News Central Corp is an information sourcing company with over 15 years of experience. Their mission is to provide accessible, quality information on business, economy, politics, law, and lifestyle to help individuals seize market opportunities in funds, real estate, economic products, cryptocurrencies, energy, and the environment. They aim to help users make informed decisions, open doors, build bridges, expand networks, and strengthen connections for a successful and fulfilling life.').then(res => res.text),

    // Why section
    translate('Why We Chose to Work with NCC').then(res => res.text),
    translate('Our partnership with NCC is built on shared values of excellence, transparency, and customer satisfaction. Here\'s why we believe this collaboration delivers exceptional value to our clients.').then(res => res.text),

    // Partnership section
    translate('Building Your Future - Together').then(res => res.text),
    translate('Benefits to Our Customers').then(res => res.text),

    // Core services
    Promise.all(coreServices.map(async (service) => {
      const [name, description] = await Promise.all([
        translate(service.name).then(res => res.text),
        translate(service.description).then(res => res.text),
      ])

      return {
        ...service,
        name,
        description,
      }
    })),

    // Partnership benefits
    Promise.all(partnershipBenefits.map(async (benefit) => {
      const [title, description] = await Promise.all([
        translate(benefit.title).then(res => res.text),
        translate(benefit.description).then(res => res.text),
      ])

      return {
        ...benefit,
        title,
        description,
      }
    })),

    // Why cards
    Promise.all(whyCards.map(async (card) => {
      const translatedTitle = await translate(card.title).then(res => res.text);
      const translatedContent = await translate(card.content).then(res => res.text);
      const translatedItems = await Promise.all(
        card.items.map(item => translate(item).then(res => res.text))
      );

      return {
        ...card,
        title: translatedTitle,
        content: translatedContent,
        items: translatedItems,
      };
    }))
  ])

  return (
    <Fragment>
      <AnimatedHeroSection
        logo="https://res.cloudinary.com/hibarr/image/upload/logo-ncc_np8hqm"
        title={heroTitle}
        subtitle={heroSubtitle}
        primaryColor={colors.primary}
      />

      <AnimatedAboutSection
        title={aboutTitle}
        description={aboutDescription}
        coreServices={translatedCoreServices}
        primaryColor={colors.primary}
      />

      <AnimatedWhySection
        title={whyTitle}
        subtitle={whySubtitle}
        cards={translatedWhyCards}
        primaryColor={colors.primary}
      />

      <AnimatedPartnershipSection
        nccLogo="https://res.cloudinary.com/hibarr/image/upload/ncc-webicon_wqlkas"
        hibarrLogo="/logos/logo-full-white.svg"
        tagline={tagline}
        benefitsTitle={benefitsTitle}
        benefits={translatedPartnershipBenefits}
        primaryColor={colors.primary}
      />
    </Fragment>
  )
} 