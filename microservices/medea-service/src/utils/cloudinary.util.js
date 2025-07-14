const cloudinary = require("cloudinary").v2;

const uploadFileInCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
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
module.exports = uploadFileInCloudinary;
