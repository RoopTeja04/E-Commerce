const AuthRouter = require("express").Router();
const { register, VerifyOTP } = require("../Controller/Controller"); 

// Post Routes
AuthRouter.post("/register", register);
AuthRouter.post("/verify-otp", VerifyOTP);

module.exports = AuthRouter;