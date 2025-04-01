const express = require("express");
const usersController = require("../controllers/userCtrl");
const isAuthenticated = require("../middlewares/isAuth");
isAuthenticated;
const userRouter = express.Router();

//! Register router
userRouter.post("/api/v1/users/register", usersController.register);
//! Login Router
userRouter.post("/api/v1/users/login", usersController.login);
//! Profile Router
userRouter.get(
  "/api/v1/users/profile",
  isAuthenticated,
  usersController.profile
);
//! changeUserPassword Router
userRouter.put(
  "/api/v1/users/change-password",
  isAuthenticated,
  usersController.changeUserPassword
);
//! UpdateUserProfile Router
userRouter.put(
  "/api/v1/users/update-profile",
  isAuthenticated,
  usersController.updateUserProfile
);

module.exports = userRouter;
