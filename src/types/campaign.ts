export type Platform = {
  id: string;
  name: string;
  label: string;
}

export type PlatformPage = {
  id: string;
  name: string;
  label: string;
  slug: string;
  platformId: string;
  platform: Platform;
}

export type CampaignRequest = {
  platform: string;
  platformPage: string;
  audience: string;
  campaignName: string;
  postCreativeName: string;
  keyword: string;
  websitePageUrl: string;
}

export type Campaign = {
  id: number;
  platform: string;
  platformPage: string;
  audience: string;
  campaignName: string;
  postCreativeName: string;
  keyword: string;
  websitePageUrl: string;
  code: string;
  trackingUrl: string;
  isActive: boolean;
  updatedAt: string;
  createdAt: string;
}