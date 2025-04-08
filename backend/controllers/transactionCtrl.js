const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Category = require("../models/Category");
const Transaction = require("../models/Transaction");

const transactionController = {
  //! Add
  create: asyncHandler(async (req, res) => {
    const { type, category, amount, date, description } = req.body;
    if (!amount || !type || !date) {
      throw new Error("Type, amount and date are required");
    }

    const transactionDate = new Date(date);
    if (isNaN(transactionDate.getTime())) {
      throw new Error("Invalid date format");
    }

    //Create
    const transaction = await Transaction.create({
      user: req.user,
      type,
      category,
      amount,
      date: transactionDate,
      description,
    });
    res.status(201).json(transaction);
  }),

  //! Lists
  getFilteredTransactions: asyncHandler(async (req, res) => {
    // const transactions = await Transaction.find({ user: req.user });
    // res.status(200).json(transactions);
    const { startDate, endDate, type, category } = req.query;
    let filteredTransactions = { user: req.user };
    if (startDate) {
      filteredTransactions.date = {
        ...filteredTransactions.date,
        $gte: new Date(startDate),
      };
    }

    if (endDate) {
      filteredTransactions.date = {
        ...filteredTransactions.date,
        $lte: new Date(endDate),
      };
    }

    if (type) {
      filteredTransactions.type = type;
    }

    if (category) {
      if (category === "All") {
        //! No category filter is needed when filtered with all
      } else if (category === "Uncategorized") {
        filteredTransactions.category = "Uncategorized";
      } else {
        filteredTransactions.category = category;
      }
    }
    const transactions = await Transaction.find(filteredTransactions).sort({
      date: -1,
    });
    res.json(transactions);
  }),

  //! Update
  update: asyncHandler(async (req, res) => {
    //! Find the transaction by ID
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      transaction.type = req.body.type || transaction.type;
      transaction.category = req.body.category || transaction.category;
      transaction.amount = req.body.amount || transaction.amount;
      transaction.date = req.body.date || transaction.date;
      transaction.description = req.body.description || transaction.description;
    }

    //! Update the transaction
    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  }),

  //! Delete
  delete: asyncHandler(async (req, res) => {
    //! Find the transaction by ID
    const transaction = await Transaction.findById(req.params.id);
    if (transaction && transaction.user.toString() === req.user.toString()) {
      await Transaction.findByIdAndDelete(req.params.id);
      res.json({ message: "Transaction deleted successfully" });
    }
  }),
};

module.exports = transactionController;
