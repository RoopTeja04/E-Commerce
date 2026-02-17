const UserModel = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SendMail } = require("../utils/mails");
const validator = require("validator");

exports.register = async (req, res) => {

    const data = req.body;

    try {

        if (!data.email || !data.password || !data.name) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        if (!validator.isEmail(data.email)) {
            return res.status(400).json({
                message: "Invalid Email",
            });
        }

        if (!validator.isLength(data.password, { min: 6 })) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
            });
        }

        if (!validator.isLength(data.name, { min: 3, max: 30 })) {
            return res.status(400).json({
                message: "Name must be between 3 and 30 characters long",
            });
        }

        const User = await UserModel.findOne({ email: data.email });

        if (User) {
            return res.status(400).json({
                message: "User already exists with this email ! Redirect to Login",
            });
        }

        const HashPassword = await bcrypt.hash(data.password, 10);

        const NewUser = await UserModel.create({
            name: data.name,
            email: data.email,
            password: HashPassword,
        });

        return res.status(200).json({
            message: "User Created Succesfully",
            User: {
                Name: NewUser.name,
                Email: NewUser.email,
                CreatedAt: NewUser.createdAt,
                IsVerified: NewUser.isVerified
            }
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

exports.login = async (req, res) => {

    const data = req.body;

    try {

        if (!data.email || !data.password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        if (!validator.isEmail(data.email)) {
            return res.status(400).json({
                message: "Invalid Email",
            });
        }

        if (!validator.isLength(data.password, { min: 6 })) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
            });
        }

        const FindedUser = await UserModel.findOne({ email: data.email });

        if (!FindedUser) {
            return res.status(401).json({
                message: "User Not Found, UnAuthorized",
            })
        }

        if (!FindedUser.isVerified) {
            return res.status(403).json({
                message: "Please verify your email first"
            })
        }

        const DecodePassword = await bcrypt.compare(data.password, FindedUser.password);

        if (!DecodePassword) {
            return res.status(401).json({
                message: "Invalid Password, UnAuthorized",
            })
        }

        if (!process.env.JWT_Token) {
            throw new Error("JWT_Token secret is missing in environment variables");
        }

        const Token = jwt.sign(
            {
                userID: FindedUser._id,
            },
            process.env.JWT_Token,
            { expiresIn: "1d" }
        )

        return res.status(200).json({
            message: "Login Succesfully",
            Token,
        })

    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

exports.validateUser = async (req, res) => {

    const data = req.body;

    try {

        if (!data.email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        const FindedUser = await UserModel.findOne({ email: data.email });

        if (!FindedUser) {
            return res.status(401).json({
                message: "User Not Found, UnAuthorized",
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 5 * 60 * 1000);

        const hashOTP = await bcrypt.hash(otp, 10);

        FindedUser.OTP = hashOTP;
        FindedUser.OTPExpiry = expiry;
        await FindedUser.save();

        await SendMail(
            data.email,
            "Email Verification OTP",
            `Your OTP for verification is: <h1>${otp}</h1> <br/> 
            It will expire in 5 minutes.`
        );

        return res.status(200).json({
            message: "OTP Sent Successfully to your Email",
        })

    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required",
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const MatchedOTP = await bcrypt.compare(otp, user.OTP);

        if (!MatchedOTP) {
            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        if (user.OTPExpiry < Date.now()) {
            user.OTP = null;
            user.OTPExpiry = null;

            await user.save();

            return res.status(400).json({
                message: "OTP Expired",
            });
        }

        user.isVerified = true;
        user.OTP = null;
        user.OTPExpiry = null;

        await user.save();

        const token = jwt.sign(
            {
                userID: user._id,
            },
            process.env.JWT_Token,
            { expiresIn: "1d" }
        )

        return res.status(200).json({
            message: "OTP Verified Successfully. User is now verified.",
            token,
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

exports.UpdateEmail = async (req, res) => {

    const { email } = req.body;

    try {

        if (!email) {
            return res.status(400).json({
                message: "All fields are required",
            })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid Email",
            });
        }

        const FindedUser = await UserModel.findOne({ email });

        if (FindedUser) {
            return res.status(409).json({
                message: "Email already in use",
            })
        }

        const currentUser = await UserModel.findById(req.user.userID);

        if (!currentUser) {
            return res.status(404).json({
                message: "User Not Found",
            })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 5 * 60 * 1000);

        const hashOTP = await bcrypt.hash(otp, 10);

        currentUser.email = email;
        currentUser.OTP = hashOTP;
        currentUser.OTPExpiry = expiry;

        await currentUser.save();

        await SendMail(
            email,
            "Email Verification OTP",
            `Your OTP for verification is: <h1>${otp}</h1> <br/> 
            It will expire in 5 minutes.`
        );

        return res.status(200).json({
            message: "OTP Sent Successfully to your New Email",
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

exports.ChangePassword = async (req, res) => {

    const { NewPassword } = req.body;

    try {

        if (!NewPassword) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const FindedUser = await UserModel.findById(req.user.userID);

        if (!FindedUser) {
            return res.status(404).json({
                message: "User Not Found",
            })
        }

        if (!FindedUser.isVerified) {
            return res.status(403).json({
                message: "Please verify your email first",
            })
        }

        const isMatched = await bcrypt.compare(NewPassword, FindedUser.password);

        if (isMatched) {
            return res.status(401).json({
                message: "New Password will not same as previous password",
            })
        }

        const hashPassword = await bcrypt.hash(NewPassword, 10);

        FindedUser.password = hashPassword;
        await FindedUser.save();

        const Token = jwt.sign(
            {
                userID: FindedUser._id,
            },
            process.env.JWT_Token,
            { expiresIn: "1d" }
        )

        return res.status(200).json({
            message: "Password Changed Successfully",
            Token,
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

exports.updateProfile = async (req, res) => {

    const data = req.body;

    try {

        if (!data.name || !data.address) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const FindedUser = await UserModel.findById(req.user.userID);

        if (!FindedUser) {
            return res.status(404).json({
                message: "User Not Found",
            })
        }

        FindedUser.name = data.name;
        FindedUser.address = data.address;
        await FindedUser.save();

        return res.status(200).json({
            message: "Profile Updated Successfully",
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}