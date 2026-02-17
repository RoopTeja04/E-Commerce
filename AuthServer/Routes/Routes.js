const express = require("express");
const AuthRouter = express.Router();
const { register, login, validateUser, verifyOTP, UpdateEmail, ChangePassword } = require("../Controller/Controller");
const { AuthMiddleware } = require("../Middleware/Middleware");

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/validate-user", validateUser);
AuthRouter.post("/verify-otp", verifyOTP);
AuthRouter.post("/update-email", AuthMiddleware, UpdateEmail);
AuthRouter.post("/change-password", AuthMiddleware, ChangePassword);

module.exports = AuthRouter;