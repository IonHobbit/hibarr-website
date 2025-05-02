import { client } from "@/lib/sanity/client";
import { PropertyResponse } from "@/types/property";
import { useQuery } from "@tanstack/react-query";

export default function useListing(slug: string) {

  const fetchListingQuery = useQuery({
    queryKey: ['listing', slug],
    queryFn: () => client.fetch<PropertyResponse>(`
      *[_type == "property" && basicInfo.slug.current == "${slug}"][0] {
      ...,
      "id": _id,
      "basicInfo": {
        ...basicInfo,
        "type": basicInfo.type[]->name
      },
      "agent": agent->{firstName, lastName, phone, image, code},
      "features": {
        "external": features.external[]->{"id": _id, name, description, image},
        "internal": features.internal[]->{"id": _id, name, description, image},
      },
    }`)
  });

  return fetchListingQuery;
}
