import { v2 as cloudinary, ResourceApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type CloudinaryFile = ResourceApiResponse['resources'][number];

const fetchFiles = async (folder: string): Promise<CloudinaryFile[]> => {
  const result = await cloudinary.search.expression(`folder=${folder}`).execute();
  return result.resources;
}

export { fetchFiles }