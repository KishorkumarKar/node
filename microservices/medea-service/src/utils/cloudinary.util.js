const logger = require("./logger.utility");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadFileInCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream((error, uploadResult) => {
        if (error) {
          return reject(error);
        }
        return resolve(uploadResult);
      })
      .end(file.buffer);
  });
};

deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    logger.info({ message: "Delete cloudinary Image", response: result });
    return result;
  } catch (err) {
    logger.error({ message: "Error in Delete cloudinary Image", err: err });
    throw err;
  }
};
module.exports = {
  uploadFileInCloudinary,
  deleteImage,
};
