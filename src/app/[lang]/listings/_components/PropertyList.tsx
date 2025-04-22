'use client';

import useListings from "@/hooks/useListings";
import Property from "./Property";
import { Pagination, PaginationNext } from "@/components/ui/pagination";
import { PaginationContent, PaginationItem, PaginationLink, PaginationPrevious } from "@/components/ui/pagination";
import useURL from "@/hooks/useURL";
import { joinWith } from "@/lib/utils";

export default function PropertyList() {
  const { searchParams, updateParams } = useURL();

  const location = searchParams.get('location')?.split(',') || [];
  const propertyType = searchParams.get('propertyType')?.split(',') || [];
  const bedrooms = searchParams.get('bedrooms') || '';
  const bathrooms = searchParams.get('bathrooms') || '';
  const features = searchParams.get('features')?.split(',') || [];
  const minPrice = parseInt(searchParams.get('minPrice') || '0');
  const maxPrice = parseInt(searchParams.get('maxPrice') || '0');

  const { data: listings, paginationInfo } = useListings(
    {
      location,
      propertyType,
      bedrooms,
      bathrooms,
      features,
      minPrice,
      maxPrice,
    },
    parseInt(searchParams.get('page') || '1'),
    parseInt(searchParams.get('limit') || '9'),
  );

  return (
    <section className="section h-full grow">
      {listings?.length === 0 && (
        <div className="flex flex-col gap-1 items-center justify-center h-[40vh] grow max-w-screen-sm mx-auto">
          <h1 className="text-2xl font-bold">No {joinWith(propertyType, 'or')} listings found</h1>
          <p className="text-sm text-muted-foreground text-center">
            {location.length > 0 ? `in ${joinWith(location, 'or')}` : ''}
            {bedrooms ? ` with ${bedrooms} bedrooms` : ''}
            {bathrooms ? ` with ${bathrooms} bathrooms` : ''}
            {features.length > 0 ? ` with ${features.join(', ')}` : ''}
            {maxPrice ? ` for less than €${maxPrice.toLocaleString()}` : ''}</p>
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
