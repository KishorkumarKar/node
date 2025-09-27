import express from "express";
import {
  addTeacher,
  deleteTeacher,
  getAllTeacher,
  getTeacherByFilter,
  getTeacher,
  updateTeacher,
  teacherLogin,
  forgotPassword,
} from "../controllers/teacher.controller";
import {
  addTeacherValidation,
  loginTeacherValidation,
  forgotPasswordTeacherValidation,
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

router.route("/").post(addTeacherValidation, addTeacher);
router.route("/login").post(loginTeacherValidation, teacherLogin);
router
  .route("/forgotpassword")
  .post(forgotPasswordTeacherValidation, forgotPassword);

router.get("/list", getAllTeacher);
router.post("/filter", getTeacherByFilter);
// router.route("/list").get(getAllTeacher);
router.route("/:id").get(getTeacher).delete(deleteTeacher).put(updateTeacher);

export default router;
