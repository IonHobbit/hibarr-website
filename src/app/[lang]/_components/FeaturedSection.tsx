import Image from "next/image"
import { InfiniteMovingCards } from "@/components/InfiniteMovingCards"
import { CloudinaryFile, fetchFiles } from "@/lib/third-party/cloudinary.client";
import { translate } from "@/lib/translation";

export default async function FeaturedSection() {
  const featuredLogos = await fetchFiles('Website/Features');
  const title = await translate('Featured in')

  const renderLogo = (item: CloudinaryFile) => (
    <div className="flex items-center justify-center relative w-40 h-20">
      <Image
        src={item.secure_url}
        alt={item.display_name}
        sizes="100%"
        fill
        loading='lazy'
        className="object-contain absolute grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  )

  return (
    <section id='featured' className='section'>
      <h3 className='text-3xl text-center' data-token={title.token}>{title.text}</h3>
      <div className='relative w-full'>
        <InfiniteMovingCards
          items={featuredLogos.map(item => renderLogo(item))}
          speed="fast"
        />
      </div>
    </section>
  )
}
