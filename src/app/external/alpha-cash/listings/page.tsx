import ListingsPage from "@/app/[lang]/listings/page"
import { Suspense } from "react"

export default async function ExternalListingsPage() {
  return <SuspendedListingsPage />
}

const SuspendedListingsPage = () => {
  return (
    <Suspense fallback={null}>
      <ListingsPage params={Promise.resolve({ lang: 'en' })} />
    </Suspense>
  )
}