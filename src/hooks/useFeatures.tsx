import { client } from "@/lib/sanity/client";
import { useQuery } from "@tanstack/react-query";

export default function useFeatures() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['features'],
    queryFn: () => client.fetch<{ id: string, name: string, type: string }[]>(`*[_type == "propertyFeature"] {
      "id": _id,
      name,
      type
    } | order(name asc)`),
  });

  return { data, isLoading, error };
}
