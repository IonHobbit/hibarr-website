import { generateSEOMetadata, toPlainText } from "@/lib/utils";
import { BlogPostCardType } from "@/types/blog";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import pluralize from "pluralize";
import { Locale } from "@/lib/i18n-config";
import { fetchBlogPost, fetchRelatedBlogPosts } from "@/lib/services/blog.service";
import BlogPostCard from "../_components/BlogPostCard";
import ShareLinks from "./_components/ShareLinks";
import SharePost from "./_components/SharePost";
import FAQs from "@/components/FAQs";
import { Fragment, ReactNode } from "react";
import { Icon } from "@/components/icons";
import Audio from "./_components/Audio";
import HeadingWithImage, { HeadingWithImageBlock } from "@/app/[lang]/blog/[slug]/_components/HeadingWithImage";
import Subheading, { SubheadingBlock } from "@/app/[lang]/blog/[slug]/_components/Subheading";
import Spacer, { SpacerBlock } from "@/app/[lang]/blog/[slug]/_components/Spacer";
import ContentTable, { TableBlock } from "@/app/[lang]/blog/[slug]/_components/ContentTable";
import TextWithImage, { TextWithImageBlock } from "@/app/[lang]/blog/[slug]/_components/TextWithImage";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await fetchBlogPost(slug)
  const seo = post?.seo

  if (!seo && !post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    }
  }

  const description = post?.description || toPlainText(post?.content).slice(0, 160) || '';

  return generateSEOMetadata(seo, {
    title: post?.title,
    description: description,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string, lang: Locale }> }) {
  const { slug, lang } = await params

  const post = await fetchBlogPost(slug);

  if (!post) {
    return (
      <div className="section mt-20 flex flex-col items-center justify-center gap-4 h-[80vh]">
        <h1 className="text-4xl font-bold text-center">Post not found</h1>
        <Link href="/blog" className="text-primary underline underline-offset-4">Back to blog</Link>
      </div>
    )
  }

  const relatedPosts = await fetchRelatedBlogPosts(lang as Locale, post)

  return (
    <div className="section mt-20 flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-3 max-w-2xl">
        <div className="flex items-center gap-2">
          <Link href={`/blog?category=${post.category.slug}`} className="text-primary uppercase text-xs">{post.category.title}</Link>
          <div className="size-1.5 bg-primary rounded-full shrink-0" />
          <p className="text-primary text-xs uppercase">{post.readTime} {pluralize('min', post.readTime)} read</p>
          {post.audio && (
            <Fragment>
              <div className="size-1.5 bg-primary rounded-full shrink-0" />
              <Audio audio={post.audio} />
            </Fragment>
          )}
        </div>
        <h1 className="text-4xl font-bold text-center">{post.title}</h1>
        <p className="text-primary text-sm">by {post.author.name}</p>
        <div className="flex flex-wrap gap-2">
          <p className="text-base font-medium">Tags: </p>
          {post.tags.map((tag, index) => (
            <div key={index} className={"px-3 py-1.5 rounded bg-primary/80 transition-all duration-300"}>
              <p className="text-xs font-medium text-white">{tag.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center">
          <SharePost post={post} />
          <div className="flex items-center gap-2">
            <span className="text-xs">Share on: </span>
            <ShareLinks post={post} />
          </div>
        </div>
        {post.image && (
          <div className="flex flex-col gap-2 w-full relative h-96 lg:h-[600px]">
            <Image src={post.image} alt={post.title || 'Blog Post Image'} fill
              priority={false}
              className="w-full h-full object-cover object-top aspect-[4/3]" />
          </div>
        )}
        <div className="max-w-4xl w-full mx-auto my-4">
          <PortableText value={post.content || []}
            components={{
              block: {
                h1: ({ children }) => (
                  <h1 className="text-4xl !font-medium mt-3 mb-6 !font-sans text-primary">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl !font-medium mt-3 mb-6 !font-sans text-primary">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl !font-medium mt-3 mb-6 !font-sans text-primary">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-xl !font-medium mt-3 mb-6 !font-sans text-primary">{children}</h4>
                ),
                h5: ({ children }) => (
                  <h5 className="text-xl !font-medium mt-3 mb-6 !font-sans text-primary">{children}</h5>
                ),
                h6: ({ children }) => (
                  <h6 className="text-lg !font-medium mt-3 mb-6 !font-sans text-primary">{children}</h6>
                ),
                normal: ({ children }) => (
                  <p className="text-base text-primary">{children}</p>
                ),
              },
              types: {
                headingWithImage: ({ value }) => (
                  <HeadingWithImage {...(value as HeadingWithImageBlock)} />
                ),
                subheading: ({ value }) => (
                  <Subheading {...(value as SubheadingBlock)} />
                ),
                spacer: ({ value }) => (
                  <Spacer {...(value as SpacerBlock)} />
                ),
                table: ({ value }) => (
                  <ContentTable {...(value as TableBlock)} />
                ),
                textWithImage: ({ value }) => (
                  <TextWithImage {...(value as TextWithImageBlock)} />
                ),
                image: ({ value }) => (
                  <div className="my-4 w-full relative aspect-video">
                    <Image src={value.asset.url} alt={value.alt} fill loading="lazy" className="w-full h-full object-contain" />
                  </div>
                ),
                audio: ({ value }) => (
                  <div className="my-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      {value.title && <h4 className="text-lg font-semibold mb-2">{value.title}</h4>}

                    </div>
                    {value.description && <p className="text-sm mb-2">{value.description}</p>}
                    <audio
                      src={value.file.url}
                      controls
                      autoPlay={value.autoplay}
                      loop={value.loop}
                      className="w-full"
                    />
                    {value.showDownloadButton && (
                      <Link
                        href={value.file.url}
                        download={value.file.originalFilename}
                        className="inline-block text-sm text-primary ml-auto"
                      >
                        <div className="flex items-center gap-1">
                          <Icon icon="mdi:download" className="text-lg" />
                          <p className="text-xs">Download</p>
                        </div>
                      </Link>
                    )}
                  </div>
                ),
                gallery: ({ value }) => {
                  const columns = (value.columns as number) || 3;
                  const gridCols = {
                    1: 'grid-cols-1',
                    2: 'grid-cols-2',
                    3: 'grid-cols-3',
                    4: 'grid-cols-4',
                    5: 'grid-cols-5',
                    6: 'grid-cols-6',
                  }[columns] || 'grid-cols-3';

                  return (
                    <div className="my-6">
                      {value.title && (
                        <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                      )}
                      <div className={`grid ${gridCols} gap-4`}>
                        {value.images?.map((item: { image: { url: string, width: number, height: number }, alt: string, caption: string }, index: number) => (
                          <div key={index} className="relative group">
                            <Image
                              src={item.image.url}
                              alt={item.alt || item.caption || `Gallery image ${index + 1}`}
                              width={item.image.width}
                              height={item.image.height}
                              className="w-full h-auto object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                            />
                            {value.showCaptions && item.caption && (
                              <p className="text-sm text-gray-600 mt-2 text-center">
                                {item.caption}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                },
                youtube: ({ value }) => {
                  // Extract video ID from YouTube URL
                  const getYouTubeVideoId = (url: string) => {
                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                    const match = url.match(regExp);
                    return (match && match[2].length === 11) ? match[2] : null;
                  };

                  const videoId = getYouTubeVideoId(value.url);

                  if (!videoId) {
                    return (
                      <div className="my-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600">Invalid YouTube URL: {value.url}</p>
                      </div>
                    );
                  }

                  return (
                    <div className="my-6">
                      {value.title && (
                        <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                      )}
                      <div className="relative w-full aspect-video">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={value.title || 'YouTube video'}
                          className="w-full h-full rounded-lg"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      {value.caption && (
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          {value.caption}
                        </p>
                      )}
                    </div>
                  );
                },
                divider: ({ value }) => {
                  const getDividerStyle = (style: string = 'solid', color: string = 'default') => {
                    const baseClasses = 'my-8';
                    const styleClasses: Record<string, string> = {
                      solid: 'border-t',
                      dashed: 'border-t border-dashed',
                      dotted: 'border-t border-dotted',
                      double: 'border-t-4',
                    };

                    const colorClasses: Record<string, string> = {
                      default: 'border-gray-300',
                      primary: 'border-primary',
                      secondary: 'border-gray-400',
                      accent: 'border-blue-500',
                      muted: 'border-gray-200',
                    };

                    return `${baseClasses} ${styleClasses[style] || styleClasses.solid} ${colorClasses[color] || colorClasses.default}`;
                  };

                  return (
                    <hr className={getDividerStyle(value.style, value.color)} />
                  );
                },
                callout: ({ value }) => {
                  const getCalloutStyle = (type: string = 'info') => {
                    const baseClasses = 'my-6 p-4 border-l-4';
                    const typeClasses: Record<string, string> = {
                      info: 'bg-blue-50 border-blue-500 text-blue-800',
                      warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
                      error: 'bg-red-50 border-red-500 text-red-800',
                      success: 'bg-green-50 border-green-500 text-green-800',
                      note: 'bg-gray-50 border-gray-500 text-gray-800',
                      tip: 'bg-purple-50 border-purple-500 text-purple-800',
                    };

                    return `${baseClasses} ${typeClasses[type] || typeClasses.info}`;
                  };

                  const getCalloutIcon = (type: string = 'info') => {
                    const icons: Record<string, ReactNode> = {
                      info: <Icon icon="mdi:information-outline" className="text-lg" />,
                      warning: <Icon icon="mdi:alert-outline" className="text-lg" />,
                      error: <Icon icon="mdi:close-circle-outline" className="text-lg" />,
                      success: <Icon icon="mdi:check-circle-outline" className="text-lg" />,
                      note: <Icon icon="mdi:note-outline" className="text-lg" />,
                      tip: <Icon icon="mdi:lightbulb-outline" className="text-lg" />,
                    };

                    return icons[type] || icons.info;
                  };

                  return (
                    <div className={getCalloutStyle(value.type)}>
                      <div className="flex items-center gap-4">
                        <span className="text-lg flex-shrink-0">
                          {getCalloutIcon(value.type)}
                        </span>
                        <div className="flex-1 flex flex-col gap-1">
                          {value.title && (
                            <h4 className="font-semibold">{value.title}</h4>
                          )}
                          <div className="prose prose-sm max-w-none">
                            <PortableText
                              value={value.content || []}
                              components={{
                                block: {
                                  normal: ({ children }) => (
                                    <p className="text-sm">{children}</p>
                                  ),
                                },
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                },
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="list-disc pl-4" style={{ color: '#053160' }}>{children}</ul>
                ),
                number: ({ children }) => (
                  <ol className="list-decimal pl-4" style={{ color: '#053160' }}>{children}</ol>
                ),
                checkmark: ({ children }) => (
                  <ul className="list-disc pl-4" style={{ color: '#053160' }}>{children}</ul>
                ),
              },
              marks: {
                link: ({ children, value }) => {
                  const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
                  return (
                    <a href={value.href} rel={rel} className="text-primary underline underline-offset-2 hover:underline-offset-4 transition-all">
                      {children}
                    </a>
                  )
                },
              }
            }}
          />
        </div>
        {post.faqs && post.faqs.length > 0 && (
          <div className="flex flex-col gap-4 mx-auto max-w-2xl">
            <p className="text-lg font-semibold">FAQs</p>
            <FAQs faqs={post.faqs} />
          </div>
        )}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-medium">Share this article</p>
          <div className="flex items-center gap-2">
            <ShareLinks post={post} />
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
