const AuthRouter = require("express").Router();
const { register, VerifyOTP, login, findUserById, ResendOTP, refreshToken } = require("../Controller/Controller"); 

// Post Routes
AuthRouter.post("/register", register);
AuthRouter.post("/verify-otp", VerifyOTP);
AuthRouter.post("/login", login);
AuthRouter.post("/resend-otp", ResendOTP);
AuthRouter.post("/refresh-token", refreshToken);

// Get Routes
AuthRouter.get("/find-user/:userId", findUserById);

module.exports = AuthRouter;