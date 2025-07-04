const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger.utils");
const User = require("../models/user.model");
const userSessionManagement = require("../utils/userSessionManagement.util");

/**
 * to create customer
 * type:POST /api/users/register
 * Registration
 */
const userRegister = asyncHandler(async (req, res) => {
  // const expiresAt = new Date();
  // console.log("--", expiresAt);
  // console.log("--", expiresAt.getMinutes());
  logger.info(req.body);

  const { name, email, password } = req.body;
  const user = await User.findOne({
    $or: [
      {
        name: name,
      },
      {
        email: email,
      },
    ],
  });
  if (user) {
    res.status(400);
    throw new Error("Customer Exist");
  } else {
    const userData = new User({ name, email, password });
    await userData.save();
    const { accessToken, refreshToken } = await userSessionManagement(userData);
    return res.json({ accessToken: accessToken, refreshToken: refreshToken });
  }

  // const user = await User.findOne({email: email});

  // throw new Error("sss")
  return res.json({ user: user });
});

/**
 * login
 * type:POST /api/users/login
 */
const customerLogin = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(201)
      .json({ message: "User Doesn't exist", status: false });
  }
  const validUser = await user.comparePassword(password);
  if (!validUser) {
    return res.status(201).json({ message: "Invalid Password", status: false });
  }
  const { accessToken: userAccessToken, refreshToken: userRefToken } =
    await userSessionManagement(user);
  return res
    .status(200)
    .json({ accessToken: userAccessToken, refreshToken: userRefToken });
});

/**
 * refresh Token
 */

/**
 * logout
 */

module.exports = {
  userRegister,
  customerLogin,
};
