import { client } from "../sanity/client"
import { Locale } from "../i18n-config"
import { BlogPostType, BlogPostCardType } from "@/types/blog"

export const fetchBlogPosts = async (lang: Locale, category: string): Promise<BlogPostCardType[]> => {
  const blogPosts = await client.fetch(`*[_type == "blogPost" && published == true && publishedAt < now() && language == $lang ${category ? `&& category->slug.current == $category` : ''}] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "author": author->{
      name,
      "image": image.asset->url,
    },
    publishedAt,
    "image": image.asset->url,
    "category": category->{
      title,
      "slug": slug.current,
    },
    description,
    readTime
  }`, { lang, category })
  return blogPosts
}

export const fetchBlogPost = async (slug: string): Promise<BlogPostType> => {
  const post = await client.fetch(`*[_type == "blogPost" && published == true && publishedAt < now() && slug.current == $slug][0]{
    ...,
    "slug": slug.current,
    "author": author->{
      name,
      "image": image.asset->url,
    },
    "image": image.asset->url,
    "category": category->{
      title,
      "slug": slug.current,
    },
    "tags": tags[]->{
      _id,
      title,
      "slug": slug.current,
    },
  }`, { slug })
  return post
}

export const fetchRelatedBlogPosts = async (lang: Locale, blogPost: BlogPostType): Promise<BlogPostCardType[]> => {
  const relatedPosts = await client.fetch(`*[_type == "blogPost" && published == true && publishedAt < now() && language == $lang && category->slug.current == $category && slug.current != $slug] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
  }`, { lang, category: blogPost.category.slug, slug: blogPost.slug })
  return relatedPosts
}
