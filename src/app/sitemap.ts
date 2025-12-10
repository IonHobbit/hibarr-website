import { fetchSanityData } from '@/lib/third-party/sanity.client'
import { MetadataRoute } from 'next'
import { groq } from 'next-sanity'

// Define your base URL
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hibarr.de'

// Define supported languages
const languages = ['en', 'de', 'tr', 'ru']

// Define static routes with their priorities
const staticRoutes = [
  { path: '', priority: 1.0 }, // homepage
  { path: '/about', priority: 0.8 },
  { path: '/blog', priority: 0.8 },
  { path: '/webinar', priority: 0.8 },
  { path: '/consultation', priority: 0.8 },
  { path: '/facebook-group', priority: 0.8 },
  // { path: '/partners/oscar-group', priority: 0.7 },
  { path: '/partners/near-east-group', priority: 0.7 },
  { path: '/our-packages', priority: 0.8 },
  { path: '/listings', priority: 0.8 },
  { path: '/testimonials', priority: 0.7 },
  { path: '/webinar-recording', priority: 0.7 },
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

    routes.push({
      url: `${baseUrl}${route.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: route.priority,
      alternates: {
        languages: alternates
      }
    })
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

// Main sitemap generation function
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = generateStaticRoutes()
  const blogPosts = await getBlogPosts()

  const blogRoutes: MetadataRoute.Sitemap = []

  // Process blog posts
  for (const post of blogPosts) {
    if (post.slug) {
      const alternates: Record<string, string> = {}

      // Create alternates for each language
      for (const lang of languages) {
        alternates[lang] = `${baseUrl}/${lang}/blog/${post.slug}`
      }

      blogRoutes.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post._updatedAt),
        changeFrequency: 'daily',
        priority: 0.7,
        alternates: {
          languages: alternates
        }
      })
    }
  }

  return [...staticRoutes, ...blogRoutes]
}
