import { fetchSanityData } from '@/lib/third-party/sanity.client'
import { MetadataRoute } from 'next'
import { groq } from 'next-sanity'

// Define your base URL
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hibarr.de'

// Define supported languages
const languages = ['en', 'de', 'tr', 'ru']

// Define static routes with their priorities
const staticRoutes = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const }, // homepage
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/webinar', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/consultation', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/facebook-group', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/partners/near-east-group', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/partners/news-central-corp', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/our-packages', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/listings', priority: 0.8, changeFrequency: 'daily' as const },
  { path: '/testimonials', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/client-testimonials', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/webinar-recording', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/careers', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/ebook', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/privacy-policy', priority: 0.5, changeFrequency: 'yearly' as const },
  // { path: '/findr', priority: 0.8 }, // add later
]

// Function to generate static routes with language alternates
const generateStaticRoutes = () => {
  const routes: MetadataRoute.Sitemap = []

  for (const route of staticRoutes) {
    const alternates: Record<string, string> = {}

    // Create alternates for each language
    for (const lang of languages) {
      alternates[lang] = `${baseUrl}/${lang}${route.path}`
    }
    alternates['x-default'] = `${baseUrl}/en${route.path}`

    // Add entries for each language version
    for (const lang of languages) {
      routes.push({
        url: `${baseUrl}/${lang}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: alternates
        }
      })
    }
  }

  return routes
}

// Function to fetch blog posts from Sanity
async function getBlogPosts() {
  const query = groq`*[_type == "blogPost"] {
    "slug": slug.current,
    _updatedAt
  }`

  try {
    const posts = await fetchSanityData<{ slug: string; _updatedAt: string }[]>(query)
    return posts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

// Function to fetch properties from Sanity
async function getProperties() {
  const query = groq`*[_type == "property"] {
    "slug": basicInfo.slug.current,
    _updatedAt
  }`

  try {
    const properties = await fetchSanityData<{ slug: string; _updatedAt: string }[]>(query)
    return properties
  } catch (error) {
    console.error('Error fetching properties:', error)
    return []
  }
}

// Main sitemap generation function
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = generateStaticRoutes()
  const blogPosts = await getBlogPosts()
  const properties = await getProperties()

  const dynamicRoutes: MetadataRoute.Sitemap = []

  // Process blog posts
  for (const post of blogPosts) {
    if (post.slug) {
      const alternates: Record<string, string> = {}

      // Create alternates for each language
      for (const lang of languages) {
        alternates[lang] = `${baseUrl}/${lang}/blog/${post.slug}`
      }
      alternates['x-default'] = `${baseUrl}/en/blog/${post.slug}`

      // Add entries for each language
      for (const lang of languages) {
        dynamicRoutes.push({
          url: `${baseUrl}/${lang}/blog/${post.slug}`,
          lastModified: new Date(post._updatedAt),
          changeFrequency: 'monthly',
          priority: 0.6,
          alternates: {
            languages: alternates
          }
        })
      }
    }
  }

  // Process properties
  for (const property of properties) {
    if (property.slug) {
      const alternates: Record<string, string> = {}

      // Create alternates for each language
      for (const lang of languages) {
        alternates[lang] = `${baseUrl}/${lang}/listings/${property.slug}`
      }
      alternates['x-default'] = `${baseUrl}/en/listings/${property.slug}`

      // Add entries for each language
      for (const lang of languages) {
        dynamicRoutes.push({
          url: `${baseUrl}/${lang}/listings/${property.slug}`,
          lastModified: new Date(property._updatedAt),
          changeFrequency: 'daily',
          priority: 0.8,
          alternates: {
            languages: alternates
          }
        })
      }
    }
  }

  return [...staticRoutes, ...dynamicRoutes]
}
