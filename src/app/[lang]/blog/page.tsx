import type { BlogPage } from "@/types/sanity.types";
import BlogPosts from "./_components/BlogPosts";
import { client } from "@/lib/sanity/client";
import { BlogPostCardType, BlogPostCategoryType } from "@/types/blog";
import { cn } from "@/lib/utils";
import BlogCategories, { ALL_CATEGORY } from "./_components/BlogCategories";
import FeaturedBlogPosts from "./_components/FeaturedBlogPosts";

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params

  const categories = await client.fetch<BlogPostCategoryType[]>(`*[_type == "blogPostCategory"]{
    _id,
    title,
    "slug": slug.current,
  }`)

  const postPage = await client.fetch<{
    title: string;
    subtitle: string;
    featuredPosts: BlogPostCardType[];
  }>(`*[_type == "blogPage" && language == $lang][0]{
    title,
    subtitle,
    "featuredPosts": featuredPosts[]->{
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
    }
  }`, { lang })


  const title = postPage?.title || 'Blog'
  const subtitle = postPage?.subtitle || 'Here we share our thoughts and insights on the real estate market.'
  const featuredPosts = postPage?.featuredPosts || []

  const featured: BlogPostCardType[] = featuredPosts?.map((post) => ({
    ...post,
    publishedAt: new Date(post.publishedAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
  })) || []


  return (
    <div>
      {
        featured.length > 0 && (
          <FeaturedBlogPosts featuredPosts={featured} />
        )
      }
      <div id="posts" className={cn("section mt-20", featured.length > 0 && "mt-0")}>
        <div className="flex flex-col gap-1.5">
          <h1 className="text-4xl font-bold">{title || 'Blog'}</h1>
          <p>{subtitle || 'Here we share our thoughts and insights on the real estate market.'}</p>
        </div>
        <BlogCategories categories={[ALL_CATEGORY, ...categories]} />
        <BlogPosts />
      </div>
    </div>
  )
}
