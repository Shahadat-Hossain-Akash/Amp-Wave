import cloudinary from "cloudinary";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file to Cloudinary.
 * @param {string} file - The path to the file to be uploaded.
 * @param {string} folder - The folder within Cloudinary where the file will be stored.
 * @returns {Promise<{ public_id: string, url: string }>} - A promise that resolves to an object containing the public_id and URL of the uploaded file.
 */
const uploadFileToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};

export { uploadFileToCloudinary, cloudinary };
