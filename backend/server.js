const express = require("express");
const userRouter = require("./routes/userRouter");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

//!Connect to mongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("ExpenseFlow DB connected.."))
  .catch((e) => console.log(e));

//!Middlewares
app.use(express.json()); //? Parse incoming Json data

//!Route
app.use("/", userRouter);

//!Start the server
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => console.log(`Server is running... on ${PORT}`));
