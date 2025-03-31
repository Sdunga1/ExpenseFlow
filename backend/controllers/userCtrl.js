const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//! User Registration

const usersController = {
  //! Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    //! Validate
    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }
    //!Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists. please Login");
    }

    //! Hash the user Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //!Create the user and save it into the db
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json({
      username: newUser.username,
      email: newUser.email,
      id: newUser._id,
    });
  }),

  //! Login
  login: asyncHandler(async (req, res) => {
    //!Get the user data
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    //! if email is correct
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Login credentials");
    }

    //!Compare the user password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid Login Credentials");
    }

    //!Generate a new json token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });

    res.json({
      message: "Login Success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),
  //!Profile
};

module.exports = usersController;
