const express = require("express");
const {
  userRegister,
  customerLogin,
  refreshToken,
  userLogout,
} = require("../controllers/user.controller");
const {
  registerUserValidation,
  loginValidation,
  refreshTokenValidation,
} = require("../middlewares/route/user/user.validation.middleware");
const router = express.Router();

router.post("/register", registerUserValidation, userRegister);
router.post("/login", loginValidation, customerLogin);
router.post("/refreshtoken", refreshTokenValidation, refreshToken);
router.get("/logout", userLogout);

module.exports = router;
