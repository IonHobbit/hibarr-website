import { BlogPost } from "./sanity.types";

export type BlogPostCardType = {
  _id: string;
  title: string;
  slug: string;
  author: {
    name: string;
    image: string;
  };
  publishedAt: string;
  image: string;
  category: {
    title: string;
    slug: string;
  };
  description: string;
  readTime: number;
}

export type BlogPostCategoryType = {
  title: string;
  slug: string;
}

export type BlogPostType = {
  tags: {
    _id: string;
    title: string;
    slug: string;
  }[];
  author: {
    name: string;
    image: string;
  };
  category: {
    title: string;
    slug: string;
  };
  slug: string;
  image: string;
} & BlogPost