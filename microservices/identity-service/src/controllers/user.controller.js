const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger.utils");
const User = require("../models/user.model");
const UserSession = require("../models/session.model");
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
 * type:POST app/users/refreshtoken
 */
const refreshToken = asyncHandler(async (req, res) => {
  const { token: refreshToken } = req.body;
  //-----using promise-------
  const token = await new Promise((resolve) => {
    setTimeout(async () => {
      const userSession = await UserSession.findOne({ token: refreshToken });
      return resolve(userSession);
    }, 3000);
  });
  //-----using promise-------

  //-----using setTimeout to get session data------
  /**
   * In this token will have no data because setTimeout doesn't return
   * promise it promise to execute to handle this we need to execute this inside promise
   * as executed on upper code.
   */
  // const token = await setTimeout(
  //   async function () {
  //     console.log("==aaaaaaa===", refreshToken);
  //     return await UserSession.findOne({ token: refreshToken });
  //   }.bind(refreshToken),
  //   3000
  // );
  //-----using setTimeout to get session data------

  //-----------
  if (!token) {
    res.status(401);
    throw new Error("Invalid Token");
  }
  const user = await User.findOne({ _id: token.userId });
  token.deleteOne();
  if (!user) {
    res.status(401);
    throw new Error("User doesn't exist");
  }
  const { accessToken: userAccessToken, refreshToken: userRefreshToken } =
    await userSessionManagement(user);
  res.status(200).json({
    success: true,
    accessToken: userAccessToken,
    refreshToken: userRefreshToken,
  });
});

/**
 * logout
 * type:get app/users/logout
 */
const userLogout = asyncHandler(async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: "token required", success: false });
  }
  const deleted = await UserSession.findOneAndDelete({ token: token });

  if (!deleted) {
    res.status(401);
    throw new Error("Invalid Token");
  }

  return res.status(200).json({ success: true, message: "User Logout" });
});

module.exports = {
  userRegister,
  customerLogin,
  refreshToken,
  userLogout,
};
