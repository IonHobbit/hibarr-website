'use client';

import useListings, { Filters } from "@/hooks/useListings";
import Property from "./Property";
import { Pagination, PaginationNext } from "@/components/ui/pagination";
import { PaginationContent, PaginationItem, PaginationLink, PaginationPrevious } from "@/components/ui/pagination";
import useURL from "@/hooks/useURL";
import { joinWith, cn } from "@/lib/utils";
import { decryptJSON, TOKEN_SECRET } from "@/lib/encryptor";
import useFeatures from "@/hooks/useFeatures";
import pluralize from "pluralize";
import usePropertyTypes from "@/hooks/usePropertyTypes";
import { Icon } from "@/components/icons";

export default function PropertyList() {
  const { searchParams, updateParams } = useURL();

  const q = searchParams.get('q') || '';
  const filters: Filters = q ? decryptJSON(q, TOKEN_SECRET) || {} : {};

  const location = filters.location || [];
  const propertyType = filters.propertyType || [];
  const bedrooms = filters.bedrooms || '';
  const bathrooms = filters.bathrooms || '';
  const features = filters.features || [];
  const minPrice = parseInt(searchParams.get('minPrice') || '0');
  const maxPrice = parseInt(searchParams.get('maxPrice') || '0');
  const listingType = filters.listingType || '';

  const { listings, isPending, error, refetch, paginationInfo } = useListings(
    {
      location,
      propertyType,
      bedrooms,
      bathrooms,
      features,
      minPrice,
      maxPrice,
      listingType,
    },
    parseInt(searchParams.get('page') || '1'),
    parseInt(searchParams.get('limit') || '9'),
  );

  const featuresHook = useFeatures();
  const propertyTypesHook = usePropertyTypes();

  const findFeature = (id: string) => {
    return featuresHook.data?.find(({ id: featureId }) => featureId === id)?.name;
  }

  const findPropertyType = (id: string) => {
    return propertyTypesHook.data?.find(({ id: propertyTypeId }) => propertyTypeId === id)?.name;
  }

  const featureList = features.map(feature => pluralize(findFeature(feature) || ''));
  const propertyTypeList = propertyType.map(propertyType => pluralize(findPropertyType(propertyType) || '', 1));

  return (
    <section className="section h-full grow">
      <div className="min-h-[80dvh]">
        {listings?.length === 0 && (
          <div className="flex flex-col gap-1 items-center justify-center h-[40dvh] grow max-w-screen-sm mx-auto">
            <h1 className="text-2xl font-bold">No {joinWith(propertyTypeList, 'or')} listings found</h1>
            <p className="text-sm text-muted-foreground text-center">
              {location.filter(Boolean).length > 0 ? `in ${joinWith(location, 'or')}` : ''}
              {bedrooms ? ` with ${bedrooms} ${pluralize('bedroom', parseInt(bedrooms))}` : ''}
              {bathrooms ? `${bedrooms ? ' and' : ' with'} ${bathrooms} ${pluralize('bathroom', parseInt(bathrooms))}` : ''}
              {featureList.length > 0 ? ` featuring ${featureList.join(', ')}` : ''}
              {maxPrice ? ` under €${maxPrice.toLocaleString()}` : ''}
            </p>
          </div>
        )}
        {error && (
          <div className="flex flex-col gap-2 items-center justify-center h-[80dvh]">
            <h3 className="text-3xl font-bold max-w-md text-center">Looks like something went wrong loading the listings</h3>
            <p className="text-lg text-muted-foreground hover:underline cursor-pointer" onClick={() => refetch()}>Please try again</p>
          </div>
        )}
        {((!listings && !error) || isPending) && (
          <div className="flex items-center justify-center h-[80dvh]">
            <Icon icon="mdi:loading" className="size-8 animate-spin" />
          </div>
        )}
        {listings && listings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {listings?.map((listing, index) => (
              <Property key={index} property={listing} />
            ))}
          </div>
        )}
      </div>
      {paginationInfo.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {paginationInfo.currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => updateParams({ key: 'page', value: paginationInfo.currentPage - 1 })} />
              </PaginationItem>
            )}
            {Array.from({ length: paginationInfo.totalPages }, (_, index) => (
              <PaginationItem key={index} className={cn(paginationInfo.currentPage === index + 1 && 'bg-accent text-accent-foreground')}>
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
