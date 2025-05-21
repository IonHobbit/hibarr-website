import { generateSEOMetadata } from "@/lib/utils";
import { BlogPostCardType } from "@/types/blog";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import pluralize from "pluralize";
import { Locale } from "@/lib/i18n-config";
import { fetchBlogPost, fetchRelatedBlogPosts } from "@/lib/services/blog.service";
import BlogPostCard from "../_components/BlogPostCard";

export async function generateMetadata({ params }: { params: Promise<{ slug: string, lang: Locale }> }) {
  const { slug, lang } = await params
  const { seo } = await fetchBlogPost(slug)

  return generateSEOMetadata(seo);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string, lang: Locale }> }) {
  const { slug, lang } = await params

  const post = await fetchBlogPost(slug)
  const relatedPosts = await fetchRelatedBlogPosts(lang as Locale, post)

  // const shareableUrl = `${window.location.origin}/blog/${post.slug}`

  return (
    <div className="section mt-20 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-3 max-w-2xl">
        <div className="flex items-center gap-2">
          <Link href={`/blog?category=${post.category.slug}`} className="text-primary uppercase text-xs">{post.category.title}</Link>
          <div className="size-1.5 bg-primary rounded-full shrink-0" />
          <p className="text-primary text-xs uppercase">{post.readTime} {pluralize('min', post.readTime)} read</p>
        </div>
        <h1 className="text-4xl font-bold text-center">{post.title}</h1>
        <p className="text-primary text-sm">by {post.author.name}</p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Share this article</p>
          <div className="flex items-center gap-2">
            <span className="text-xs">Share on: </span>
            <Link href={`https://www.facebook.com/sharer/sharer.php?u=${post.slug}`} target="_blank" className="text-gray-500 flex items-center gap-1 hover:text-gray-700">
              <Icon icon="mdi:facebook" className="size-5" />
            </Link>
            <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${post.slug}`} target="_blank" className="text-gray-500 flex items-center gap-1 hover:text-gray-700">
              <Icon icon="mdi:linkedin" className="size-5" />
            </Link>
            <Link href={`https://twitter.com/intent/tweet?url=${post.slug}`} target="_blank" className="text-gray-500 flex items-center gap-1 hover:text-gray-700">
              <Icon icon="mdi:twitter" className="size-5" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full relative h-96">
          <Image src={post.image} alt={post.title || 'Blog Post Image'} fill
            priority={false}
            className="w-full h-full object-cover" />
        </div>
        <div className="max-w-2xl mx-auto my-4">
          <PortableText value={post.content || []}
            components={{
              block: {
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold mt-2 mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-bold mt-2 mb-4">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-bold mt-2 mb-4">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-xl font-bold mt-2 mb-4">{children}</h4>
                ),
                h5: ({ children }) => (
                  <h5 className="text-xl font-bold mt-2 mb-4">{children}</h5>
                ),
                h6: ({ children }) => (
                  <h6 className="text-lg font-bold mt-2 mb-4">{children}</h6>
                ),
                normal: ({ children }) => (
                  <p className="text-base">{children}</p>
                ),
              },
              types: {
                image: ({ value }) => (
                  <Image src={value.asset.url} alt={value.alt} width={value.asset.width} height={value.asset.height} />
                )
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="list-disc pl-4">{children}</ul>
                ),
                number: ({ children }) => (
                  <ol className="list-decimal pl-4">{children}</ol>
                ),
                checkmark: ({ children }) => (
                  <ul className="list-disc pl-4">{children}</ul>
                ),
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-base">Tags</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <div className={"px-3 py-1.5 rounded bg-primary/70 transition-all duration-300"}>
                <p className="text-xs font-medium text-white">{tag.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-medium">Share this article</p>
          <div className="flex items-center gap-2">
            <Link href={`https://www.facebook.com/sharer/sharer.php?u=${post.slug}`} target="_blank" className="text-gray-500 flex items-center gap-1 hover:text-primary">
              <Icon icon="mdi:facebook" className="size-5" />
            </Link>
            <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${post.slug}`} target="_blank" className="text-gray-500 flex items-center gap-1 hover:text-primary">
              <Icon icon="mdi:linkedin" className="size-5" />
            </Link>
            <Link href={`https://twitter.com/intent/tweet?url=${post.slug}`} target="_blank" className="text-gray-500 flex items-center gap-1 hover:text-primary">
              <Icon icon="mdi:twitter" className="size-5" />
            </Link>
          </div>
        </div>
        {relatedPosts.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-base">Related posts</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPosts.map((post: BlogPostCardType) => (
                <BlogPostCard key={post._id} blogPost={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
