const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (accessToken) {
      const { data: user } = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
      );
      req.headers["x-user-id"] = user._id;
      return next();
    }
    res.status(400);
    return res.json({
      message: "Access Denied",
      status: false,
    });
  } catch (error) {
    console.log("--error---", error);
    res.status(400);
    return res.json({
      message: "Access Denied",
      status: false,
    });
  }
};

module.exports = authMiddleware;
