import { WithContext, Organization, Product, Review, FAQPage, VideoObject, RealEstateAgent } from 'schema-dts';
import { Property, CaseStudy } from '@/types/sanity.types';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/third-party/sanity.client';

const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function urlFor(source: any) {
    return builder.image(source);
}

export const generateOrganizationSchema = (): WithContext<Organization> => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'HIBARR',
        url: 'https://hibarr.de',
        logo: 'https://hibarr.de/logos/logo-blue.png',
        email: 'info@hibarr.de',
        sameAs: [
            'https://www.facebook.com/profile.php?id=61574067689864',
            'https://www.instagram.com/hibarrestate',
            'https://www.linkedin.com/company/hibarr-trading-ltd/',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+90-539-119-1823',
            contactType: 'customer service',
            areaServed: ['TR', 'DE', 'GB', 'RU'],
            availableLanguage: ['en', 'tr', 'de', 'ru'],
            email: 'info@hibarr.de',
        },
    };
};

export const generateLocalBusinessSchema = (): WithContext<RealEstateAgent> => {
    return {
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent', // Or generic LocalBusiness
        name: 'HIBARR Real Estate',
        image: 'https://hibarr.de/logos/logo-blue.png',
        '@id': 'https://hibarr.de',
        url: 'https://hibarr.de',
        telephone: '+90-539-119-1823',
        email: 'info@hibarr.de',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Şehit Mehmet Mustafa Sokak, No: 171',
            addressLocality: 'Girne - Merkez',
            addressRegion: 'North Cyprus',
            postalCode: '99300',
            addressCountry: 'CY',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 35.3333, // Replace with actual coords
            longitude: 33.3167,
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ],
            opens: '09:00',
            closes: '18:00',
        },
    };
};

export const generateProductSchema = (listing: Property): WithContext<Product> => {
    const info = listing.basicInfo || {};

    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: info.title || '',
        image: info.images?.[0]?.image ? urlFor(info.images[0].image).url() : '',
        description: info.title || '', // Fallback as description is PortableText
        sku: info.slug?.current || '',
        brand: {
            '@type': 'Brand',
            name: 'HIBARR',
        },
        offers: {
            '@type': 'Offer',
            url: `https://hibarr.de/listings/${info.slug?.current}`,
            priceCurrency: info.price?.currency || 'GBP',
            price: info.price?.amount,
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
        },
    };
};

export const generateReviewSchema = (reviews: CaseStudy[]): WithContext<Review>[] => {
    return reviews.map((review) => ({
        '@context': 'https://schema.org',
        '@type': 'Review',
        author: {
            '@type': 'Person',
            name: review.clientName || 'Anonymous',
        },
        reviewRating: {
            '@type': 'Rating',
            ratingValue: 5, // Default to 5 as specific rating is not in schema
            bestRating: 5,
        },
        reviewBody: review.tagLine || review.clientName || '', // Fallback
    }));
};

export const generateFAQSchema = (faqs: { question: string; answer: string }[]): WithContext<FAQPage> => {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
};

export const generateVideoSchema = (video: CaseStudy): WithContext<VideoObject> => {
    return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: video.clientName ? `${video.clientName} Testimonial` : 'Client Testimonial',
        description: video.tagLine || '',
        thumbnailUrl: video.thumbnail ? urlFor(video.thumbnail).url() : '',
        uploadDate: video._createdAt,
        contentUrl: video.videoUrl || '',
        embedUrl: video.videoUrl || '',
    };
};
