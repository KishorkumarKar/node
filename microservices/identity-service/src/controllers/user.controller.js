const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger.utils");
const { error } = require("winston");

/**
 * to create customer
 * type:post /api/users/register
 * Registration
 */
const userRegister = asyncHandler((req, res) => {
  const expiresAt = new Date();
  console.log("--", expiresAt);
  console.log("--", expiresAt.getMinutes());
  logger.info(req.body);
  // throw new Error("sss")
  res.json({ user: "kishor" });
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
