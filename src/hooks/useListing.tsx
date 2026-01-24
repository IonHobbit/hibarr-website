'use client';

import { PropertyListing } from "@/types/property";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { APIResponse } from "@/lib/services/api.service";
import { makeCRMGETRequest } from "@/lib/services/properties-api.service";

export default function useListing(id: string) {

  const fetchListingQuery = useQuery({
    queryKey: ['listing', id],
    queryFn: async () => {
      const response = await makeCRMGETRequest<APIResponse<PropertyListing>>(`/api/v1/properties/${id}`);
      return response?.data;
    },
    placeholderData: keepPreviousData
  });

  return fetchListingQuery;
}
