const express = require("express");
const AuthRouter = express.Router();
const { register, login, validateUser, verifyOTP, UpdateEmail, ChangePassword } = require("../Controller/Controller");
const { AuthMiddleware } = require("../Middleware/Middleware");

// Post Routes
AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.post("/validate-user", validateUser);
AuthRouter.post("/verify-otp", verifyOTP);

// Update Routes
AuthRouter.patch("/update-email", AuthMiddleware, UpdateEmail);
AuthRouter.patch("/change-password", AuthMiddleware, ChangePassword);
AuthRouter.patch("/update-profile", AuthMiddleware, updateProfile);

module.exports = AuthRouter;