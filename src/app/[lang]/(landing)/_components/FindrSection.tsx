'use client'

import Expandable, { ExpandableItem } from "@/components/animata/carousel/expandable";
import { client } from "@/lib/sanity/client";
import { PropertyKind } from "@/types/sanity.types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function FindrSection() {
  const items = [
    {
      image:
        "https://images.unsplash.com/photo-1551361415-69c87624334f?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Apartments",
    },
    {
      image:
        "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Manisons",
    },
    {
      image:
        "https://images.unsplash.com/photo-1702014862053-946a122b920d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Studios",
    },
    {
      image:
        "https://images.unsplash.com/photo-1580041065738-e72023775cdc?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Condominiums",
    },

  ];

  const router = useRouter();

  const { data: propertyKinds } = useQuery({
    queryKey: ['findr-items'],
    queryFn: () => {
      return client.fetch<PropertyKind[]>(`*[_type == "propertyKind" && main == true]{
        ...,
        "images": images[].asset->url,
        "slug": slug.current
        }`)
    }
  })

  const list = [...(propertyKinds?.filter(item => item.images?.[0]).map(item => ({
    image: item.images?.[0] || '',
    title: item.name,
    slug: item.slug
  })) || []), ...items] as ExpandableItem[]

  const handleItemClick = (item: ExpandableItem) => {
    router.push(`/findr/${item.slug}`);
  };

  return null;

  return (
    <section className='section gap-6'>
      <div className='container mx-auto flex flex-col gap-2'>
        <h2 className='text-4xl font-bold text-center'>
          HIBARR Property findr
        </h2>
        <p className='text-center text-muted-foreground'>Discover the possibilities with Hibarr</p>
      </div>
      <Expandable list={list} onItemClick={handleItemClick} />
    </section>
  )
}
