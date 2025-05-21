'use client'

import { BlogPostType } from '@/types/blog'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'
import React, { Fragment } from 'react'

export default function ShareLinks({ post }: { post: BlogPostType }) {

  const fullURL = `${window.location.origin}/blog/${post.slug}`;

  return (
    <Fragment>
      <Link href={`https://www.facebook.com/sharer/sharer.php?u=${fullURL}`} target="_blank" className="text-gray-500 flex items-center gap-1 hover:text-gray-700">
        <Icon icon="mdi:facebook" className="size-5" />
      </Link>
      <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${fullURL}`} target="_blank" className="text-gray-500 flex items-center gap-1 hover:text-gray-700">
        <Icon icon="mdi:linkedin" className="size-5" />
      </Link>
      <Link href={`https://twitter.com/intent/tweet?url=${fullURL}`} target="_blank" className="text-gray-500 flex items-center gap-1 hover:text-gray-700">
        <Icon icon="mdi:twitter" className="size-5" />
      </Link>
    </Fragment>
  )
}
