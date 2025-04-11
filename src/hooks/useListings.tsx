'use client';

import { PropertyType } from "@/types/main";
import { listings as mockListings } from "@/lib/mockdata";
import { useQuery } from "@tanstack/react-query";

type Filters = {
  location?: string[];
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
  const { data, isLoading, error } = useQuery<PropertyType[]>({
    queryKey: ['listings', filters, page, limit],
    queryFn: () => mockListings.filter((listing) => runFilters(filters, listing)).slice((page - 1) * limit, page * limit),
  });

  const paginationInfo = {
    totalPages: Math.ceil(mockListings.filter((listing) => runFilters(filters, listing)).length / limit),
    currentPage: page,
    totalItems: mockListings.length,
  }

  return { data, isLoading, error, paginationInfo };
}
