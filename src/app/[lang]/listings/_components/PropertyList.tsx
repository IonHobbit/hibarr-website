'use client';

import useListings from "@/hooks/useListings";
import Property from "./Property";
import { Pagination, PaginationNext } from "@/components/ui/pagination";
import { PaginationContent, PaginationItem, PaginationLink, PaginationPrevious } from "@/components/ui/pagination";
import useURL from "@/hooks/useURL";

export default function PropertyList() {
  const { searchParams, updateParams } = useURL();

  const { data: listings, paginationInfo } = useListings(
    {
      location: searchParams.get('location')?.split(',') || [],
      propertyType: searchParams.get('propertyType')?.split(',') || [],
      bedrooms: searchParams.get('bedrooms') || '',
      bathrooms: searchParams.get('bathrooms') || '',
      features: searchParams.get('features')?.split(',') || [],
      minPrice: parseInt(searchParams.get('minPrice') || '0'),
      maxPrice: parseInt(searchParams.get('maxPrice') || '0'),
    },
    parseInt(searchParams.get('page') || '1'),
    parseInt(searchParams.get('limit') || '9'),
  );

  return (
    <section className="section h-full grow">
      {listings?.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[40vh] grow">
          <h1 className="text-2xl font-bold">No listings found</h1>
        </div>
      )}
      {listings && listings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {listings?.map((listing, index) => (
            <Property key={index} property={listing} />
          ))}
        </div>
      )}
      {paginationInfo.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {paginationInfo.currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => updateParams({ key: 'page', value: paginationInfo.currentPage - 1 })} />
              </PaginationItem>
            )}
            {Array.from({ length: paginationInfo.totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => updateParams({ key: 'page', value: index + 1 })}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            {paginationInfo.currentPage < paginationInfo.totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => updateParams({ key: 'page', value: paginationInfo.currentPage + 1 })} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </section>
  )
}
