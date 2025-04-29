import { generateRandomFileName } from "./utils";

const BASE_HOSTNAME = process.env.BASE_HOSTNAME;
const HOSTNAME = BASE_HOSTNAME;
const STORAGE_ZONE_NAME = process.env.STORAGE_ZONE_NAME;
const STORAGE_PULL_ZONE_NAME = process.env.STORAGE_PULL_ZONE_NAME;
const FOLDER_NAME = process.env.FOLDER_NAME;
const ACCESS_KEY = process.env.ACCESS_KEY;

export const uploadFile = async (file: File, folderName: string): Promise<string> => {
  const filename = generateRandomFileName(file);
  const url = `https://${HOSTNAME}/${STORAGE_ZONE_NAME}/${folderName || FOLDER_NAME}/${filename}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'AccessKey': ACCESS_KEY || '',
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response.statusText}`);
  }

  // Return the CDN URL of the uploaded file
  return `https://${STORAGE_PULL_ZONE_NAME}.b-cdn.net/${folderName || FOLDER_NAME}/${filename}`;
};