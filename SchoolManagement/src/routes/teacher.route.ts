import express from "express";
import {
  addTeacher,
  deleteTeacher,
  getAllTeacher,
  getTeacher,
  updateTeacher,
  teacherLogin,
} from "../controllers/teacher.controller";
import {
  addTeacherValidation,
  loginTeacherValidation,
} from "../middlewares/teacher.middleware";
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

router.route("/:id").get(getTeacher).delete(deleteTeacher).put(updateTeacher);

router.route("/").post(addTeacherValidation, addTeacher);
router.route("/login").post(loginTeacherValidation, teacherLogin);

router.get("/list", getAllTeacher);

export default router;
