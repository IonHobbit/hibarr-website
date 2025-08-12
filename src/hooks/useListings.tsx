'use client';

import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/third-party/sanity.client";
import { PropertyListResponse } from "@/types/property";

export type Filters = {
  location?: string[];
  listingType?: string;
  propertyType?: string[];
  bedrooms?: string;
  bathrooms?: string;
  features?: string[];
  minPrice?: number;
  maxPrice?: number;
}

export default function useListings(
  filters: Filters,
  page: number,
  limit: number,
) {
  const filtersString = [
    ((filters.propertyType?.length && filters.propertyType.filter(Boolean).length > 0) || (filters.features?.length && filters.features.filter(Boolean).length > 0)) ? `&& references(${filters.propertyType?.concat(filters.features || []).flat(2).map(feature => `"${feature}"`).join(',')})` : '',
    filters.location?.length && filters.location.filter(Boolean).length > 0 ? `&& basicInfo.location in ${JSON.stringify(filters.location)}` : '',
    filters.listingType ? `&& basicInfo.listingType == "${filters.listingType}"` : '',
    filters.bedrooms ? `&& basicInfo.bedrooms == ${filters.bedrooms}` : '',
    filters.bathrooms ? `&& basicInfo.bathrooms == ${filters.bathrooms}` : '',
    filters.minPrice ? `&& basicInfo.price.amount >= ${filters.minPrice}` : '',
    filters.maxPrice ? `&& basicInfo.price.amount <= ${filters.maxPrice}` : '',
    '&& basicInfo.status != "draft" && basicInfo.status != "archived" && basicInfo.status != "sold" && basicInfo.status != "rented"',
  ].filter(Boolean);

  const fetchListingsQuery = useQuery({
    queryKey: ['listings', filters, page, limit],
    queryFn: async () => {
      const [listings, count] = await Promise.all([
        client.fetch<PropertyListResponse[]>(`
          *[_type == "property" ${filtersString.join(' ')}] | order(_updatedAt desc) [${(page - 1) * limit}...${page * limit}] {
            "id": _id,
            _createdAt,
            _updatedAt,
            "title": basicInfo.title,
            "slug": basicInfo.slug.current,
            "image": images[0],
            "price": basicInfo.price,
            "type": basicInfo.type[]->name,
            "bathrooms": basicInfo.bathrooms,
            "bedrooms": basicInfo.bedrooms,
            "area": details.area,
            "location": basicInfo.location,
          }
        `),
        client.fetch<number>(`
          count(*[_type == "property" ${filtersString.join(' ')}])
        `)
      ]);

      return { listings, count };
    },
  })

  const listings = fetchListingsQuery.data?.listings;

  const paginationInfo = {
    totalPages: Math.ceil((fetchListingsQuery.data?.count || 0) / limit),
    currentPage: page,
    totalItems: fetchListingsQuery.data?.count || 0,
  }

  return {
    ...fetchListingsQuery,
    listings,
    paginationInfo
  };
}
