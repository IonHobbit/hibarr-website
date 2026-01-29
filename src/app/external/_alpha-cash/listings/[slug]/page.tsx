import ListingPage from "@/app/[lang]/_listings/[slug]/page"

export default async function ExternalListingPage({ params }: { params: Promise<{ slug: string }> }) {
  return <ListingPage params={params} />
}