import { v2 as cloudinary } from "cloudinary";

const cloud_name = process.env.CLOUDINARY_PROJECT_NAME!;
const api_key = process.env.CLOUDINARY_API_KEY!;
const api_secret = process.env.CLOUDINARY_API_SECRET!;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
  secure: true,
});

const cloudUploader = cloudinary.uploader;

export const cloudApi = cloudinary.api;
export default cloudUploader;
