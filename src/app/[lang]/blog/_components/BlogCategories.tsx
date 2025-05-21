'use client'

import Link from "next/link"
import { cn } from "@/lib/utils"
import useURL from "@/hooks/useURL"
import { BlogPostCategoryType } from "@/types/blog"

export const ALL_CATEGORY = {
  title: 'All',
  slug: ''
}

type BlogCategoriesProps = {
  categories: BlogPostCategoryType[]
}

export const BlogCategory = ({ category, selectedCategory }: { category: BlogPostCategoryType, selectedCategory?: string }) => {
  return (
    <Link href={category.slug === ALL_CATEGORY.slug ? `/blog#posts` : `/blog?category=${category.slug}#posts`} key={category.slug}>
      <div className={cn("px-4 py-2 rounded hover:bg-gray-200 transition-all duration-300", selectedCategory === category.slug && "bg-gray-100")}>
        <p className="text-sm font-medium">{category.title}</p>
      </div>
    </Link>
  )
}
export default function BlogCategories({ categories }: BlogCategoriesProps) {
  const { searchParams } = useURL()
  const selectedCategory = searchParams.get('category') || ALL_CATEGORY.slug;

  return (
    <div className="flex gap-4 justify-between">
      <div className="flex gap-2 items-center overflow-x-auto">
        {categories.map((category) => (
          <BlogCategory key={category.slug} category={category} selectedCategory={selectedCategory} />
        ))}
      </div>
    </div>
  )
}
