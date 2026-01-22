'use client';

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ListingsFilters, PropertyListing } from "@/types/property";
import usePropertyAxios, { APIPaginatedResponse } from "./usePropertyAxios";

export type Filters = Partial<ListingsFilters>;

export default function useListings(
  filters: ListingsFilters,
  page: number,
  limit: number,
) {
  const propertyAxios = usePropertyAxios();

  const fetchListingsQuery = useQuery({
    queryKey: ['listings', filters, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams();

      params.append('page', String(page));
      params.append('limit', String(limit));

      if (filters.property_type) {
        params.append('property_type', filters.property_type);
      }

      if (filters.city) {
        params.append('city', filters.city);
      }

      if (filters.sales_type) {
        params.append('sales_type', filters.sales_type);
      }

      if (filters.bedrooms) {
        params.append('bedrooms', filters.bedrooms);
      }

      if (filters.bathrooms) {
        params.append('bathrooms', filters.bathrooms);
      }

      if (filters.features?.length && filters.features.filter(Boolean).length > 0) {
        filters.features.filter(Boolean).forEach(feature => params.append('features', feature));
      }

      if (filters.minPrice) {
        params.append('minPrice', String(filters.minPrice));
      }

      if (filters.maxPrice) {
        params.append('maxPrice', String(filters.maxPrice));
      }

      const response = await propertyAxios.get<APIPaginatedResponse<PropertyListing>>(`/api/v1/properties?${params.toString()}`);

      return {
        listings: response.data?.data,
        count: response?.data?.total,
      };
    },
    placeholderData: keepPreviousData,
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
