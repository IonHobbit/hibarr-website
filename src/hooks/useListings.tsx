'use client';

import { PropertyType } from "@/types/main";
import { listings as mockListings } from "@/lib/mockdata";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/sanity/client";
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

const runFilters = (filters: Filters, listing: PropertyType) => {
  if (filters.location && filters.location.length > 0 && !filters.location.some(location => listing.location.toLowerCase() === location.toLowerCase())) return false;
  if (filters.propertyType && filters.propertyType.length > 0 && !filters.propertyType.some(type => listing.type.toLowerCase() === type.toLowerCase())) return false;
  if (filters.features && filters.features.length > 0 && !filters.features.some(feature => listing.features.map(f => f.toLowerCase().replace(/ /g, '-')).includes(feature.toLowerCase()))) return false;

  if (filters.bedrooms && filters.bedrooms !== '' && listing.bedrooms !== parseInt(filters.bedrooms)) return false;
  if (filters.bathrooms && filters.bathrooms !== '' && listing.bathrooms !== parseInt(filters.bathrooms)) return false;


  if (filters.minPrice && filters.minPrice > 0 && listing.price < filters.minPrice) return false;
  if (filters.maxPrice && filters.maxPrice > 0 && listing.price > filters.maxPrice) return false;

  return true;
}

export default function useListings(
  filters: Filters,
  page: number,
  limit: number,
) {
  const filtersString = [
    (filters.propertyType?.length || filters.features?.length) ? `&& references(${filters.propertyType?.concat(filters.features || []).flat(2).map(feature => `"${feature}"`).join(',')})` : '',
    filters.location?.length ? `&& basicInfo.location in ${JSON.stringify(filters.location)}` : '',
    filters.listingType ? `&& basicInfo.listingType == "${filters.listingType}"` : '',
    filters.bedrooms ? `&& basicInfo.bedrooms == ${filters.bedrooms}` : '',
    filters.bathrooms ? `&& basicInfo.bathrooms == ${filters.bathrooms}` : '',
    filters.minPrice ? `&& basicInfo.price.amount >= ${filters.minPrice}` : '',
    filters.maxPrice ? `&& basicInfo.price.amount <= ${filters.maxPrice}` : '',
    '&& basicInfo.status != "draft" && basicInfo.status != "archived" && basicInfo.status != "sold" && basicInfo.status != "rented"',
  ].filter(Boolean);

  const fetchListingsQuery = useQuery({
    queryKey: ['listings', filters, page, limit],
    queryFn: () => client.fetch<PropertyListResponse[]>(`
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
  })

  const paginationInfo = {
    totalPages: Math.ceil(mockListings.filter((listing) => runFilters(filters, listing)).length / limit),
    currentPage: page,
    totalItems: mockListings.length,
  }

  return { ...fetchListingsQuery, paginationInfo };
}
