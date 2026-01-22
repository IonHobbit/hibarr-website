import { Property, SanityImageAsset } from "./sanity.types"

export type PropertyListResponse = {
  id: string,
  _createdAt: string,
  _updatedAt: string,
  title: string,
  slug: string,
  image: {
    image: SanityImageAsset,
    alt: string,
    isCover: boolean,
  },
  price: string,
  type: string[],
  bathrooms: number,
  bedrooms: number,
  area: {
    unit: string,
    size: number,
  },
  location: string,
}

export type PropertyResponse = {
  id: string,
  basicInfo: {
    type: string[],
    slug: string,
    title: string,
  },
  agent: {
    firstName: string,
    lastName: string,
    phone: string,
    image: SanityImageAsset,
    code: string,
  },
  features: {
    external: {
      id: string,
      name: string,
      description: string,
      image: SanityImageAsset,
    }[],
    internal: {
      id: string,
      name: string,
      description: string,
      image: SanityImageAsset,
    }[],
  },
} & Property;


export type ListingsFilters = {
  status?: string;
  city?: string;
  property_type?: string;
  sales_type?: string;
  fields?: string[];

  // location?: string[];
  // listingType?: string;
  bedrooms?: string;
  bathrooms?: string;
  features?: string[];
  minPrice?: number;
  maxPrice?: number;
};

export type PropertyListing = {
  id: number;
  title: string;
  description: string;
  price: string;
  status: string;
  sale_type: string;
  property_type: string;
  city: string;
  area: string;
  bedrooms: string;
  bathrooms: number;
  living_room: number | null;
  land_size: string;
  floor_number: number;
  floors_in_building: number;
  building_age: number;
  furniture_status: string | null;
  title_deed_type: string | null;
  title_deed_stage: string | null;
  minimal_rental_period: string | null;
  rent_payment_interval: string | null;
  within_site: boolean;
  tour_360_url: string | null;
  video_url: string | null;
  map: string | null;
  company_id: number;
  agent: {
    id: number;
    user_id: number;
    name: string;
    email: string;
    status: string;
    created_at: string;
    updated_at: string;
  } | null;
  photos: any[];
  add_ons: string[];
  interior_features: any[];
  exterior_features: any[];
  location_features: string[];
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: string;
  product_sku: string | null;
  product_image: string | null;
  product_image_url: string;
  product_category_id: number | null;
  product_sub_category_id: number | null;
  product_unit_id: number | null;
  product_taxes: string | null;
  product_hsn_sac_code: string | null;
  product_total_amount: string;
  product_downloadable: number;
  product_downloadable_file: string | null;
  product_download_file_url: string | null;
  product_default_image: string | null;
  product_allow_purchase: number;
  product_company_id: number;
  product_added_by: number | null;
  product_last_updated_by: number | null;
  created_at: string;
  updated_at: string;
};
