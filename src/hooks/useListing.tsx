'use client';

import { PropertyListing } from "@/types/property";
import { useQuery } from "@tanstack/react-query";
import usePropertyAxios from "./usePropertyAxios";
import { APIResponse } from "@/lib/services/api.service";

export default function useListing(slug: string) {
  const propertyAxios = usePropertyAxios();

  const fetchListingQuery = useQuery({
    queryKey: ['listing', slug],
    queryFn: async () => {
      const response = await propertyAxios.get<APIResponse<PropertyListing>>(`/api/v1/properties/${slug}`);
      return response?.data?.data;
    },
  });

  return fetchListingQuery;
}
