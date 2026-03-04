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
      });
    }

    const user = await UserModel.findOne({
      $or: [{ email: data.TempEmail }, { TempEmail: data.TempEmail }],
    });

    if (user) {
      return res
        .status(403)
        .json({ message: "User Already Exists! Try to login" });
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    const NewUser = await UserModel.create({
      name: data.name,
      TempEmail: data.TempEmail,
      password: hashPassword,
      otp: OTP,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
    });

    await NewUser.save();

    await SendMail(
      data.TempEmail,
      "Email Verification",
      `Your OTP for verification <br />
            <h1>${OTP}</h1> <br />
            It will expire in 5 minutes.
            `,
    );

    return res.status(201).json({
      message: `<p>User Account Created Successfully. </p>. <br /> 
            We sent to OTP to your Registered Email. <br />
            For Verification.`,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Down",
      error: err.message,
    });
  }
};

exports.VerifyOTP = async (req, res) => {
  const data = req.body;

  try {
    if (!data.TempEmail || !data.OTP) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await UserModel.findOne({ TempEmail: data.TempEmail });

    if (!user) {
      return res.status(401).json({
        message: "User Not Founded! Try to Register Again",
      });
    }

    if (new Date(user.otpExpiry).getTime() < Date.now()) {
      return res.status(400).json({
        message: "OTP has expired! Please Try Again",
      });
    }

    if (user.otp !== data.OTP) {
      return res.status(400).json({
        message: "Invalid OTP! Please Try Again",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    user.email = user.TempEmail;
    user.TempEmail = null;

    await user.save();

    const Token = jwt_Token.sign({ ID: user._id }, process.env.JWT_Token, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "User Verified Successfully",
      Token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Down",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const data = req.body;

  try {
    if (!data.email || !data.password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const findedAccount = await UserModel.findOne({
      $or: [{ email: data.email }, { TempEmail: data.TempEmail }],
    });

    if (!findedAccount) {
      return res.status(401).json({
        message: "UnAuthorized! No Account founded with this email",
      });
    }

    if (findedAccount.TempEmail || findedAccount.isVerified === false) {
      const OTP = Math.floor(100000 + Math.random() * 900000).toString();

      const user = await findedAccount.create({
        OTP: OTP,
        otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
      });

      await user.save();

      await SendMail(
        data.TempEmail,
        "Email Verification",
        `Your OTP for verification <br />
            <h1>${OTP}</h1> <br />
            It will expire in 5 minutes.
            `,
      );

      return res.status(403).json({
        message:
          "Account Founded but Email not verified. We sent a OTP to your mail check once",
      });
    }

    const comparePassword = await bcrypt.hash(
      findedAccount.password,
      data.password,
    );

    if (!comparePassword) {
      return res.status(401).json({
        message: "Password Not Matched! check the password once again...",
      });
    }

    const token = jwt_Token.sign(
      { ID: findedAccount._id },
      process.env.JWT_Token,
      { expiresIn: "7d" },
    );

    return res.status(201).json({
      message: "User Verified Successfully",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Down",
      error: err.message,
    });
  }
};

exports.ResendOTP = async (req, res) => {
  const data = req.body;

  try {
    if (!data.email) {
      return res.status(401).json({
        message: "UnAuthorized! Please try again later",
      });
    }

    const findedAccount = await UserModel.findOne({ TempEmail: data.email });

    if (!findedAccount.TempEmail) {
      return res.status(403).json({
        message: "Invalid Email Can you check Again",
      });
    }

    const GenOTP = Math.floor(100000 + Math.random() * 900000).toString();

    await findedAccount.updateOne({
      otp: GenOTP,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
    });

    await SendMail(
      data.email,
      "Email Verification",
      `Your OTP for verification <br />
            <h1>${GenOTP}</h1> <br />
            It will expire in 5 minutes.
            `,
    );

    return res.status(200).json({
      message: "OTP Sent Successfully",
    });

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Down",
      error: err.message,
    });
  }
};
