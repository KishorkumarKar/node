const logger = require("../utils/logger.utility");
const { consumeMessage } = require("../utils/rabbitMq.util");
const { deleteImage } = require("../utils/cloudinary.util");
const { deleteMedia, getMediaById } = require("../service/media.service");
const consumePostDelete = async (message) => {
  const {
    mediaId: mediaIds,
    _id: postId,
    userId,
  } = JSON.parse(message.content.toString());
  for (const media of mediaIds) {
    const mediaData = await getMediaById(media);
    if (mediaData) {
      //----If we want to delete and print the response--------
      /* const isDeleted = await deleteMedia(media);
      const isImageDeleted = await deleteImage(mediaData.public_id);
      console.log("======Media Id==deleteImage==---", isImageDeleted);
      console.log(
        "======Media Id==delete==---",
        isDeleted,
        mediaData.public_id
      ); */
      //----If we want to delete and print the response--------
      //--------- No ned to wait for delete response-------

      deleteMedia(media);
      deleteImage(mediaData.public_id);

      logger.info({
        message: "media Deleted",
        mediaData: mediaData,
      });
      //--------- No ned to wait for delete response-------
    }
  }
  //   logger.info({ message: "Post Que", ...contentMessage });
  // let exchange=process.env.RABBIT_MQ_EXCHANGE_POST;
  // consumeMessage('test_'+exchange,exchange,"delete_post");
};

const consumePostQue = async () => {
  let exchange = process.env.RABBIT_MQ_EXCHANGE_POST;
  consumeMessage(
    "test_" + exchange,
    exchange,
    "delete_post",
    consumePostDelete,
  );
};

module.exports = consumePostQue;
