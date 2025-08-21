import { Property, SanityImageAsset } from "./sanity.types"

export type PropertyListResponse = {
  id: string,
  _createdAt: string,
  _updatedAt: string,
  title: string,
  slug: string,
  image: {
    image: SanityImageAsset,
    alt: string,
    isCover: boolean,
  },
  price: {
    currency?: 'GBP' | 'USD' | 'EUR' | 'AED' | 'TRY'
    amount?: number
  },
  type: string[],
  bathrooms: number,
  bedrooms: number,
  area: {
    unit: string,
    size: number,
  },
  location: string,
}

export type PropertyResponse = {
  id: string,
  basicInfo: {
    type: string[],
    slug: string,
    title: string,
  },
  agent: {
    firstName: string,
    lastName: string,
    phone: string,
    image: SanityImageAsset,
    code: string,
  },
  features: {
    external: {
      id: string,
      name: string,
      description: string,
      image: SanityImageAsset,
    }[],
    internal: {
      id: string,
      name: string,
      description: string,
      image: SanityImageAsset,
    }[],
  },
} & Property;