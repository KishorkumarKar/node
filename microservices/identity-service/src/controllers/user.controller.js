const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger.utils");
const User = require("../models/user.model");
const userSessionManagement = require("../utils/userSessionManagement.util");

/**
 * to create customer
 * type:post /api/users/register
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
 */

/**
 * refresh Token
 */

/**
 * logout
 */

module.exports = {
  userRegister,
};
