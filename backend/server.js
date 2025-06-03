const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
require("dotenv").config();

//!Connect to mongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("ExpenseFlow DB connected.."))
  .catch((e) => console.log(e));

//!Middlewares
app.use(express.json()); //? Parse incoming Json data

const corsOptions = {
  origin: "https://expense-flow-fd.vercel.app",
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("ExpenseFlow API is running");
});

//!Route
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
app.use(errorHandler);

//!Start the server
const PORT = process.env.PORT || 8002;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running... on ${PORT}`)
);
