const AuthRouter = require("express").Router();
const { register, VerifyOTP, login } = require("../Controller/Controller"); 

// Post Routes
AuthRouter.post("/register", register);
AuthRouter.post("/verify-otp", VerifyOTP);
AuthRouter.post("/login", login);

module.exports = AuthRouter;