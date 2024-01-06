import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (localFilePath, folderName) => {
  try {
    if (!localFilePath) return null;

    // Cloudinary upload options
    const uploadOptions = { resource_type: "auto" };

    // If folderName is provided, include it in the upload options
    if (folderName) {
      uploadOptions.folder = folderName;
    }

    // upload the file to cloudinary
    const response = await cloudinary.uploader.upload(
      localFilePath,
      uploadOptions,
      function (error, result) {
        console.log(result);
      }
    );

    // file has been uploaded successfully
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};
