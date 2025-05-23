const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Category = require("../models/Category");
const Transaction = require("../models/Transaction");

const categoryController = {
  //! Add
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if (!name || !type) {
      throw new Error("Name and type are required for creating a category");
    }

    //!Convert the name to lowercase
    const rawname = name.trim();

    //! Check if the type is valid
    const validTypes = ["income", "expense"];
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error(`Invalid category type ${type}`);
    }

    //! Check if the same category created by the user exists
    const categoryExists = await Category.findOne({
      name: rawname,
      user: req.user,
    }).collation({ locale: "en", strength: 2 });

    if (categoryExists) {
      throw new Error(
        `Category ${categoryExists.name} already exists in the database`
      );
    }

    //! Create the category
    const newCategory = await Category.create({
      name: rawname,
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
  update: asyncHandler(async (req, res) => {
    const { type, name } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category || category.user.toString() !== req.user.toString()) {
      throw new Error("Category not found or user not authorized");
    }

    if (name) {
      const clash = await Category.findOne({
        user: req.user,
        name: name.trim(),
        _id: { $ne: req.params.id },
      }).collation({ locale: "en", strength: 2 });
      if (clash) {
        throw new Error(`Category "${clash.name}" already exists`);
      }
    }

    const oldName = category.name;
    //! Update category properties
    category.name = name || category.name;
    category.type = type || category.type;
    const updatedCategory = await category.save();
    //! Now Update affected transaction
    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        {
          user: req.user,
          category: oldName,
        },
        { $set: { category: updatedCategory.name } }
      );
    }
    res.json(updatedCategory);
  }),

  //! Delete
  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category && category.user.toString() === req.user.toString()) {
      //!  Update transactions that have this category
      const defaultCategory = "Uncategorized";
      await Transaction.updateMany(
        { user: req.user, category: category.name },
        { $set: { category: defaultCategory } }
      );
      //! Remove category
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: "Category removed and transactions updated" });
    } else {
      res.json({ message: "Category not found or user not authorized" });
    }
  }),
};

module.exports = categoryController;
