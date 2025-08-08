const asyncHandler = require("express-async-handler");
const logger = require("./logger.utils");
const LoginSession = require("../models/session.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSessionManagement = asyncHandler(async (user) => {
  const userId = user._id;
  const expiryTime = new Date();
  expiryTime.setMinutes(expiryTime.getMinutes() + 3);
  const refreshToken = await bcrypt.hash(
    userId + expiryTime.toDateString(),
    Number(process.env.BCRYPT_SALT),
  );
  await LoginSession.create({
    token: refreshToken,
    userId: userId,
    expiryTime: expiryTime,
  });

  const accessToken = jwt.sign(
    {
      data: {
        user: user.name,
        email: user.email,
        _id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1hr" },
  );
  return { accessToken, refreshToken };
});

module.exports = userSessionManagement;
