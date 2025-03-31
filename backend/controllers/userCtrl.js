const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs')
const User = require("../models/User");
//! User Registration

const usersController = {
  //! Register
  register: asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    
    //! Validate
    if(!username || !email || !password) {
        throw new Error("All fields are required");
    }
    //!Check if user exists
    const userExists = await User.findOne({email});
    if(userExists) {
        throw new Error("User already exists. please Login");
    }

    //! Hash the user Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //!Create the user and save it into the db
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    })


    res.json({ 
        username: newUser.username,
        email: newUser.email,
        id: newUser._id,
     });
  }),

  //! Login
  //!Profile
};

module.exports = usersController;