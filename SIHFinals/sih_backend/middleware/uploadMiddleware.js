import cloudinary from "cloudinary";
import multer from "multer";
import streamifier from "streamifier";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload = multer({ storage: multer.memoryStorage() });

export const uploadToCloudinary = async (buffer, folder) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
      { folder },
      function (error, result) {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
  });
};
