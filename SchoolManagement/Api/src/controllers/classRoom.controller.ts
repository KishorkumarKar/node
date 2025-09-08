import expressAsyncHandler from "express-async-handler";
import * as ClassRoomService from "../service/classRoom.service";
import logger from "../util/logger.util";

/**
 * to all class
 * POST V1/class/
 */
export const add = expressAsyncHandler(async (req, res) => {
  const classRoom = req.body;
  const classRoomObject = await ClassRoomService.add(classRoom);
  logger.info("Class Room save", classRoomObject);
  res
    .status(200)
    .json({ success: true, message: "hi...", class: classRoomObject });
});

/**
 * to get all class
 * GET V1/class/
 */
export const list = expressAsyncHandler(async (req, res) => {
  const classRoom = req.body;
  const { limit, page } = req.headers;
  const limitNumber = limit ? parseInt(limit as string, 10) : 10;
  const pageNumber = page ? parseInt(page as string, 10) : 1;
  const startFrom = (pageNumber - 1) * limitNumber;
  const classRoomObject = await ClassRoomService.list(limitNumber, startFrom);
  res
    .status(200)
    .json({
      success: true,
      class: classRoomObject.class_room,
      total: classRoomObject.total,
    });
});
