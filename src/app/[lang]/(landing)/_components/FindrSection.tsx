'use client'

import Expandable from "@/components/animata/carousel/expandable";

export default function FindrSection() {
  const items = [
    {
      image:
        "https://images.unsplash.com/photo-1551361415-69c87624334f?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Apartments",
    },
    {
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Villas",
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

  const handleItemClick = (item: { image: string; title: string }) => {
    console.log(item);
  };

  return (
    <section className='section gap-6'>
      <div className='container flex flex-col gap-2'>
        <h2 className='text-4xl font-bold text-center'>
          Hibarr Property findr
        </h2>
        <p className='text-center text-muted-foreground'>Discover the possibilities with Hibarr</p>
      </div>
      <Expandable list={items} onItemClick={handleItemClick} />
    </section>
  )
}
