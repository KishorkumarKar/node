const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger.utility");
const Media = require("../models/media.models");
const uploadFileInCloudinary = require("../utils/cloudinary.util");
const { sendToQueue } = require("../utils/publisher.util");
const { pushData } = require("../utils/rabbitMq.util");
const uploadFile = asyncHandler(async (req, res) => {
  //-----------

  // await pushData({mes:"Hi..."});
  // return res.status(200).json({res:true});
  //-----------
  console.log(req.file);
  const file = req.file;
  await uploadFileInCloudinary(file)
    .then(async (result) => {
      const { public_id, url } = result;
      logger.info(`Cloudinary in file upload ${JSON.stringify(result)}`);
      const mediaObject = new Media({
        public_id,
        userId: req.headers["x-user-id"],
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

      // sendToQueue(response);
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

const mediaList = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    Message: "list",
  });
});

module.exports = {
  uploadFile,
  mediaList,
};
