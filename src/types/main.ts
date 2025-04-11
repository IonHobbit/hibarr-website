import { Dictionary } from "@/lib/dictionary";

type NavigationItem = Dictionary['navigation'][number]

type PropertyType = {
  id: string;
  name: string;
  price: number;
  location: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  size: number;
  type: string;
  features: string[];
  description: string;
  labels: string[];
  statuses: string;
  link: string;
}

export type { NavigationItem, PropertyType }