const AuthRouter = require("express").Router();
const { register, VerifyOTP, login, findUserById } = require("../Controller/Controller"); 

// Post Routes
AuthRouter.post("/register", register);
AuthRouter.post("/verify-otp", VerifyOTP);
AuthRouter.post("/login", login);

// Get Routes
AuthRouter.get("/find-user/:userId", findUserById);

module.exports = AuthRouter;