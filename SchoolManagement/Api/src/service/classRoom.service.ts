import { IClassroomDocument } from "../interface/classRoom.interface";
import ClassRoom from "../models/classRoom.model";

/**
 * To add classRoom
 * @param classRoomData
 * @returns
 */
export const add = async (classRoomData: IClassroomDocument) => {
  const classRoom = new ClassRoom(classRoomData);
  return await classRoom.save();
};

/**
 * get list of all class
 */

export const list = async (limit: number, startFrom: number) => {
  const classRoom = await ClassRoom.find()
    .limit(limit)
    .skip(startFrom)
    .sort({ createdAt: -1 });
  const total = await await ClassRoom.countDocuments();
  return { class_room: classRoom, total: total };
};
