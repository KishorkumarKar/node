const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { createToken, compareToken } = require("../utils/bcrypt");
const { constants } = require("../constants");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  try {
    //has code
    const hashedPassword = await createToken(password);
    console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(`User created ${user}`);
    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }
  } catch (error) {
    res.status(constants.BCRYPT_ERROR);
    throw new Error(error.message);
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  console.log(process.env.ACCESS_TOKEN_SECRET);
  const isValidToken = await compareToken(password, user.password).catch(
    (error) => {
      res.status(constants.BCRYPT_ERROR);
      console.log(error.message);
      throw new Error(error.message);
    }
  );

  if (user && isValidToken) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1hr" }
    );
    res.status(200).json({ accessToken });
  } else {
    console.log("process.env.ACCESS_TOKEN_SECRET");
    res.status(constants.UNAUTHORIZED);
    throw new Error("email or password is not valid");
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
