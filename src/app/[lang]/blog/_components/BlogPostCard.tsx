import { BlogPostCardType } from '@/types/blog'
import Image from 'next/image'
import Link from 'next/link'
import pluralize from 'pluralize'
import React from 'react'

type BlogPostCardProps = {
  blogPost: BlogPostCardType
}

export default function BlogPostCard({ blogPost }: BlogPostCardProps) {
  const publishedAt = new Date(blogPost.publishedAt)
  const formattedPublishedAt = publishedAt.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <Link href={`/blog/${blogPost.slug}`}>
      <div className="flex flex-col gap-4">
        <div className="relative flex flex-col gap-2.5">
          <div className="absolute top-2.5 left-2.5 rounded-full bg-gray-700/30 py-1.5 px-3 z-10">
            <p className="text-xs text-white">{blogPost.category.title}</p>
          </div>
          <div className="h-60 bg-gray-100 rounded-lg relative overflow-hidden">
            <Image src={blogPost.image} alt={blogPost.category.title} fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              priority={false}
              className="absolute w-full h-full object-cover" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-600">{formattedPublishedAt}</p>
            <div className="size-1 bg-gray-600 rounded-full"></div>
            <p className="text-xs text-gray-600">{blogPost.readTime} {pluralize('minute', blogPost.readTime)} read</p>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-lg font-semibold line-clamp-1">{blogPost.title}</h2>
          <p className="text-sm text-gray-700 line-clamp-2">{blogPost.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full size-6 bg-gray-100 shrink-0 relative overflow-hidden">
            <Image src={blogPost.author.image} alt={blogPost.author.name} fill className="rounded-full absolute w-full h-full object-cover" />
          </div>
          <p className="text-sm font-medium">{blogPost.author.name}</p>
        </div>
      </div>
    </Link>
  )
}
