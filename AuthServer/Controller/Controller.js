const UserModel = require("../Models/UserModel");
const jwt_Token = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SendMail } = require("../utils/mails");

exports.register = async (req, res) => {

    const data = req.body;

    try {

        if (!data.TempEmail || !data.password || !data.name) {
            return res.status(400).json({
                message: "All fields are required",
            })
        }

        const user = await UserModel.findOne({
            $or: [
                { email: data.TempEmail },
                { TempEmail: data.TempEmail }
            ]
        });

        if (user) {
            return res.status(403).json({ message: "User Already Exists! Try to login" });
        }

        const hashPassword = await bcrypt.hash(data.password, 10);

        const OTP = Math.floor(100000 + Math.random() * 900000).toString();

        const NewUser = await UserModel.create({
            name: data.name,
            TempEmail: data.TempEmail,
            password: hashPassword,
            otp: OTP,
            otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
        })

        await NewUser.save();

        await SendMail(
            data.TempEmail,
            "Email Verification",
            `Your OTP for verification <br />
            <h1>${OTP}</h1> <br />
            It will expire in 5 minutes.
            `
        );

        return res.status(201).json({
            message: `<p>User Account Created Successfully. </p>. <br /> 
            We sent to OTP to your Registered Email. <br />
            For Verification.`,
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Down",
            error: err.message,
        })
    }
}

exports.VerifyOTP = async (req, res) => {
    const data = req.body;

    try {

        if (!data.TempEmail || !data.OTP) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await UserModel.findOne({ TempEmail: data.TempEmail });

        if (!user) {
            return res.status(401).json({
                message: "User Not Founded! Try to Register Again"
            })
        }

        if (new Date(user.otpExpiry).getTime() < Date.now()) {
            return res.status(400).json({
                message: "OTP has expired! Please Try Again"
            })
        }

        if (user.otp !== data.OTP) {
            return res.status(400).json({
                message: "Invalid OTP! Please Try Again"
            })
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        user.email = user.TempEmail;
        user.TempEmail = null;

        await user.save();

        const Token = jwt_Token.sign(
            { ID: user._id },
            process.env.JWT_Token,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "User Verified Successfully",
            Token,
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Down",
            error: err.message,
        })
    }
}