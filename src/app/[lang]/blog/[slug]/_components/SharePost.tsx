'use client'

import { BlogPostType } from '@/types/blog'

export default function SharePost({ post }: { post: BlogPostType }) {
  const sharePost = () => {
    if (navigator && window) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: `${window.location.origin}/blog/${post.slug}`,
      })
    }
  }

  return (
    <p className="text-sm text-gray-500 cursor-pointer" onClick={sharePost}>Share this article</p>
  )
}
