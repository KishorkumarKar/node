import express from "express";
import {
  addTeacher,
  deleteTeacher,
  getAllTeacher,
  getTeacher,
  updateTeacher,
} from "../controllers/teacher.controller";
import { addTeacherValidation } from "../middlewares/teacher.middleware";
const router = express.Router();

//----------Same-----------
/* router.get("/:id", async (req, res) => {
  res.status(200).json({ success: true });
});
router.delete("/:id", async (req, res) => {
  res.status(200).json({ success: true });
});
router.post("/:id", async (req, res) => {
  res.status(200).json({ success: true });
});
router.put("/:id", async (req, res) => {
  res.status(200).json({ success: true });
});
router.get("/list", async (req, res) => {
  res.status(200).json({ success: false });
}); */

//-----------Same----------

router
  .route("/:id")
  .get(getTeacher)
  .delete(deleteTeacher)
  .post(addTeacherValidation, addTeacher)
  .put(updateTeacher);

router.get("/list", getAllTeacher);

export default router;
