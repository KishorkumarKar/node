const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger.utility");
const Media = require("../models/media.models");
const uploadFileInCloudinary = require("../utils/cloudinary.util");
const uploadFile = asyncHandler(async (req, res) => {
  console.log(req.file);
  const file = req.file;
  await uploadFileInCloudinary(file)
    .then(async (result) => {
      const { public_id, url } = result;
      logger.info(`Cloudinary in file upload ${JSON.stringify(result)}`);
      const mediaObject = new Media({
        public_id,
        userId: "6845e1386147329d2ba51207",
        url,
        fileName: file.originalname,
      });
      const media = await mediaObject.save();
      logger.info(`Added Media file ${JSON.stringify(media)}`);
      // logger.info(...media);
      const response = {
        ...media.toObject(),
        success: true,
        message: "uploaded",
      };
      return res.status(200).json(response);
    })
    .catch((error) => {
      logger.error(`Error in file upload ${JSON.stringify(error)}`);
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    });
});

module.exports = {
  uploadFile,
};
