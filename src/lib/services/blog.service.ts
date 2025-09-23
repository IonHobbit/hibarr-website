import { fetchRawSanityData, fetchSanityData } from "../third-party/sanity.client"
import { Locale } from "../i18n-config"
import { BlogPostType, BlogPostCardType } from "@/types/blog"

export const fetchBlogPosts = async (lang: Locale, category: string): Promise<BlogPostCardType[]> => {
  const blogPosts = await fetchSanityData<BlogPostCardType[]>(`*[_type == "blogPost" && published == true && publishedAt < now() && language == $lang ${category ? `&& category->slug.current == $category` : ''}] | order(publishedAt desc) {
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
  const post = await fetchRawSanityData<BlogPostType>(`*[_type == "blogPost" && published == true && publishedAt < now() && slug.current == $slug][0]{
    ...,
    "slug": slug.current,
    "author": author->{
      name,
      "image": image.asset->url,
    },
    "image": image.asset->url,
    "audio": audio.asset->url,
    "category": category->{
      title,
      "slug": slug.current,
    },
    "tags": tags[]->{
      _id,
      title,
      "slug": slug.current,
    },
    "faqs": faqs[]->{
      question,
      answer,
    },
    "content": content[]{
      ...,
      _type == "headingWithImage" => {
        _type,
        heading,
        subheading,
        height,
        align,
        textTone,
        overlayOpacity,
        "backgroundImage": backgroundImage{
          asset->{ url, metadata{ dimensions, lqip, palette } },
          crop,
          hotspot
        }
      },
      "file": file.asset->{
        
        url,
        "originalFilename": originalFilename,
        "mimeType": mimeType,
        "size": size,
      },
      "coverImage": coverImage.asset->{
        url,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height,
      },
      "asset": asset-> {
        ...,
        url,
      },
      "images": images[]{
        ...,
        "image": image.asset->{
          url,
          "width": metadata.dimensions.width,
          "height": metadata.dimensions.height,
        },
      },
    },
  }`, { slug })
  return post
}

export const fetchRelatedBlogPosts = async (lang: Locale, blogPost: BlogPostType): Promise<BlogPostCardType[]> => {
  const relatedPosts = await fetchRawSanityData<BlogPostCardType[]>(`*[_type == "blogPost" && published == true && publishedAt < now() && language == $lang && category->slug.current == $category && slug.current != $slug] | order(publishedAt desc) {
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
    "faqs": faqs[]->{
      question,
      answer,
    },
    "content": content[]{
      ...,
      _type == "headingWithImage" => {
        _type,
        heading,
        subheading,
        height,
        align,
        textTone,
        overlayOpacity,
        "backgroundImage": backgroundImage{
          asset->{ url, metadata{ dimensions, lqip, palette } },
          crop,
          hotspot
        }
      },
      "file": file.asset->{
        url,
        "originalFilename": originalFilename,
        "mimeType": mimeType,
        "size": size,
      },
      "coverImage": coverImage.asset->{
        url,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height,
      },
      "image": image.asset->{
        url,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height,
      },
      "images": images[]{
        ...,
        "image": image.asset->{
          url,
          "width": metadata.dimensions.width,
          "height": metadata.dimensions.height,
        },
      },
    },
  }`, { lang, category: blogPost.category.slug, slug: blogPost.slug })
  return relatedPosts
}
