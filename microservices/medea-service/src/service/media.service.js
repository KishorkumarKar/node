const Media = require("../models/media.models");
const getMediaById = async (id) => {
  let mediaData = null;
  try {
    mediaData = await Media.findOne({ _id: id });
  } catch (error) {}
  return mediaData;
};
const deleteMedia = async (id) => {
  let isDeleted = false;
  try {
    const deleteData = await Media.findOneAndDelete({ _id: id });
    isDeleted = deleteData ? true : false;
  } catch (error) {}
  return isDeleted;
};

module.exports = {
  getMediaById,
  deleteMedia,
};
