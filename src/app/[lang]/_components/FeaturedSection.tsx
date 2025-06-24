import Image from "next/image"
import { InfiniteMovingCards } from "@/components/InfiniteMovingCards"
import { CloudinaryFile, fetchFiles } from "@/lib/third-party/cloudinary.client";

export default async function FeaturedSection() {
  const featured = await fetchFiles('Website/Features');

  const renderLogo = (item: CloudinaryFile) => (
    <div className="flex items-center justify-center relative w-40 h-20">
      <Image
        src={item.secure_url}
        alt={item.display_name}
        sizes="100%"
        fill
        className="object-contain absolute"
      />
    </div>
  )

  return (
    <section id='featured' className='section'>
      <h3 className='text-3xl text-center'>Featured in</h3>
      <div className='relative w-full'>
        <InfiniteMovingCards
          items={featured.map(item => renderLogo(item))}
          speed="fast"
        />
      </div>
    </section>
  )
}
