const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Category = require("../models/Category");

const categoryController = {
  //! Add
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if (!name || !type) {
      throw new Error("Name and type are required for creating a category");
    }

    //!Convert the name to lowercase
    const normalizedName = name.toLowerCase();

    //! Check if the type is valid
    const validTypes = ["income", "expense"];
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error(`Invalid category type ${type}`);
    }

    //! Check if the same category created by the user exists
    const categoryExists = await Category.findOne({
      name: normalizedName,
      user: req.user,
    });

    if (categoryExists) {
      throw new Error(
        `Category ${categoryExists.name} already exists in the database`
      );
    }

    //! Create the category
    const newCategory = await Category.create({
      name: normalizedName,
      user: req.user,
      type,
    });
    res.status(201).json(newCategory);
  }),

  //! Lists
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user });
    res.status(200).json(categories);
  }),

  //! Update
  update: asyncHandler(async (req, res) => {}),

  //! Delete
  delete: asyncHandler(async (req, res) => {}),
};

module.exports = categoryController;
