import { v2 as cloudinary } from "cloudinary";

export async function uploadImageToCloudinary(
  fileStr: string,
  folder = "army_of_salvation_members"
): Promise<string | null> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

  if (!cloudName || !apiKey || !apiSecret) {
    console.warn("Cloudinary credentials missing or empty in process.env.");
    return null;
  }

  try {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder,
      resource_type: "auto",
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
}
