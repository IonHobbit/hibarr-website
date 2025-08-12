import { client } from "@/lib/third-party/sanity.client";
import { useQuery } from "@tanstack/react-query";

export default function usePropertyTypes() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['propertyTypes'],
    queryFn: () => client.fetch<{ id: string, name: string, type: string }[]>(`*[_type == "propertyKind"] {
      "id": _id,
      name,
      type
    } | order(name asc)`),
  });

  return { data, isLoading, error };
}
