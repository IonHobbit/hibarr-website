'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import pluralize from 'pluralize'
import { Icon } from '@iconify/react/dist/iconify.js'
import { BlogPostCardType } from '@/types/blog'
import { cn } from '@/lib/utils'

type FeaturedBlogPostsProps = {
  featuredPosts: BlogPostCardType[]
}

export default function FeaturedBlogPosts({ featuredPosts }: FeaturedBlogPostsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPost = featuredPosts[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      if (featuredPosts.length > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredPosts.length);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [featuredPosts]);

  return (
    <div className="h-[80vh] p-2">
      <div className="h-full w-full relative bg-primary rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div className="absolute left-1/2 -translate-x-1/2 max-w-screen-xl mx-auto w-full flex flex-wrap items-end gap-4 justify-between bottom-20 z-10 p-6">
          <div className="flex flex-col gap-4 basis-full lg:basis-3/5">
            <div className="flex items-center gap-2 w-full justify-between">
              <Link href={`/blog?category=${currentPost.category.slug}#posts`} className="rounded-full bg-gray-700/60 py-1.5 px-3 w-max">
                <p className="text-sm text-white">{currentPost.category.title}</p>
              </Link>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white line-clamp-3">{currentPost.title}</h1>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <div className="rounded-full size-6 bg-gray-100 shrink-0 relative overflow-hidden">
                  <Image src={currentPost.author.image} alt={currentPost.author.name} fill className="rounded-full absolute w-full h-full object-cover" />
                </div>
                <p className="text-base font-medium text-white">{currentPost.author.name}</p>
              </div>
              <div className="size-1 bg-white rounded-full"></div>
              <div className="flex items-center gap-2">
                <p className="text-base text-white">{currentPost.publishedAt}</p>
                <div className="size-1 bg-white rounded-full"></div>
                <p className="text-base text-white">{currentPost.readTime} {pluralize('minute', currentPost.readTime)} read</p>
              </div>
            </div>
            <p className="text-base lg:text-lg text-white line-clamp-3">{currentPost.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Link href={`/blog/${currentPost.slug}`} className="text-white text-base lg:text-lg flex items-center gap-1 underline underline-offset-4 group">
              Read more
              <Icon icon="mdi:arrow-right" className="size-4 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10 max-w-screen-xl w-full px-6">
          {Array.from({ length: featuredPosts.length }).map((_, index) => (
            <div key={index} onClick={() => setCurrentIndex(index)} className={cn("rounded-full size-2 bg-white cursor-pointer", index === currentIndex && "bg-primary")} />
          ))}
        </div>
        <div className="relative w-full h-full">
          <Image
            src={currentPost.image}
            alt={currentPost.title}
            fill
            className="object-cover object-top transition-opacity duration-500 ease-in-out"
            key={currentPost._id}
          />
        </div>
      </div>
    </div>
  )
}
