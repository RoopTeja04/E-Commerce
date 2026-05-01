const UserModel = require("../Models/UserModel");
const jwt_Token = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SendMail } = require("../utils/mails");

exports.register = async (req, res, next) => {
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
    next(err);
  }
};

exports.VerifyOTP = async (req, res, next) => {
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
      expiresIn: "15m", // Access Token: 15 minutes
    });

    const refreshToken = jwt_Token.sign({ ID: user._id }, process.env.REFRESH_TOKEN_SECRET || "REFRESH_SECRET", {
      expiresIn: "7d", // Refresh Token: 7 days
    });

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.otp;
    delete userResponse.otpExpiry;

    return res.status(200).json({
      message: "User Verified Successfully",
      Token,
      user: userResponse
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const data = req.body;

  try {
    if (!data.email || !data.password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const findedAccount = await UserModel.findOne({
      $or: [{ email: data.email }, { TempEmail: data.email }],
    });

    if (!findedAccount) {
      return res.status(404).json({
        message: "Account not found with this email! Try to register",
      });
    }

    if (findedAccount.TempEmail || findedAccount.isVerified === false) {
      const OTP = Math.floor(100000 + Math.random() * 900000).toString();
      findedAccount.otp = OTP;
      findedAccount.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

      await findedAccount.save();

      await SendMail(
        findedAccount.TempEmail || findedAccount.email,
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

    const comparePassword = await bcrypt.compare(
      data.password,
      findedAccount.password,
    );

    if (!comparePassword) {
      return res.status(401).json({
        message: "Password Not Matched! check the password once again...",
      });
    }

    const token = jwt_Token.sign(
      { ID: findedAccount._id },
      process.env.JWT_Token,
      { expiresIn: "15m" },
    ); 

    const refreshToken = jwt_Token.sign(
      { ID: findedAccount._id },
      process.env.REFRESH_TOKEN_SECRET || "REFRESH_SECRET",
      { expiresIn: "7d" },
    );

    findedAccount.refreshToken = refreshToken;
    await findedAccount.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const userResponse = findedAccount.toObject();
    delete userResponse.password;
    delete userResponse.otp;
    delete userResponse.otpExpiry;

    return res.status(201).json({
      message: "User Verified Successfully",
      token,
      user: userResponse
    });
  } catch (err) {
    next(err);
  }
};

exports.ResendOTP = async (req, res, next) => {
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
    next(err);
  }
};

exports.findUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      message: "User Found",
      user: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  const refreshToken = cookies.refreshToken;

  try {
    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    jwt_Token.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || "REFRESH_SECRET",
      (err, decoded) => {
        if (err || user._id.toString() !== decoded.ID) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }

        const accessToken = jwt_Token.sign(
          { ID: user._id },
          process.env.JWT_Token,
          { expiresIn: "15m" }
        );

        res.json({ accessToken, user });
      }
    );
  } catch (err) {
    next(err);
  }
};
