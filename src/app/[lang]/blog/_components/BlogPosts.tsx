'use client';

import React from 'react'
import BlogPostCard from './BlogPostCard';
import { BlogPostCardType } from '@/types/blog';
import { useQuery } from '@tanstack/react-query';
import useURL from '@/hooks/useURL';
import { ALL_CATEGORY } from './BlogCategories';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Locale } from '@/lib/i18n-config';
import { fetchBlogPosts } from '@/lib/services/blog.service';

export default function BlogPosts() {
  const { lang } = useParams()
  const { searchParams } = useURL()
  const selectedCategory = searchParams.get('category') || ALL_CATEGORY.slug;

  const { data: blogPosts, error, isPending, isRefetching, refetch } = useQuery({
    queryKey: ['blogPosts', selectedCategory],
    queryFn: async (): Promise<BlogPostCardType[]> => {
      const blogPosts = await fetchBlogPosts(lang as Locale, selectedCategory)
      return blogPosts
    }
  })

  if (isPending && !blogPosts) {
    return (
      <div className="flex flex-col items-center justify-center h-80">
        <Loader2 className="size-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-80">
        <h1 className="text-2xl font-bold">Loading the posts took a bit longer than expected</h1>
        <Button onClick={() => refetch()} size="sm" isLoading={isRefetching}>Please try again</Button>
      </div>
    )
  }

  if (!isPending && blogPosts?.length === 0) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-80">
        <h1 className="text-2xl font-bold">We have no posts {selectedCategory === ALL_CATEGORY.slug ? '' : `in this category`} right now</h1>
        <p className="text-sm text-gray-500">Please check back later</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogPosts?.map((blogPost) => (
        <BlogPostCard key={blogPost._id} blogPost={blogPost} />
      ))}
    </div>
  )
}
