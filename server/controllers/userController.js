const zod = require("zod");
const { User } = require("../db/index");
const bcrypt = require("bcrypt");
const getHashedPassowrd = require("../utils/getHashOfPassword");
const signJwtToken = require("../utils/signJwtToken");

async function register(req, res) {
  try {
    const { fullname, email, phone, password, role } = req.body;

    const registerUserZodSchema = zod.object({
      fullname: zod.string().min(2),
      email: zod.string().email(),
      phone: zod.string().length(10),
      password: zod.string().min(5),
      role: zod.enum(["candidate", "recruiter"]),
    });

    const inputValidationResult = registerUserZodSchema.safeParse({
      fullname,
      email,
      phone,
      password,
      role,
    });

    if (!inputValidationResult.success) {
      return res.status(400).json({
        message: "Wrong inputs provided",
        success: false,
      });
    }

    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const createdUser = await User.create({
      fullname,
      email,
      phone,
      password: await getHashedPassowrd(password),
      role,
    });

    const jwtToken = signJwtToken({ userId: createdUser._id });
    res.cookie("authorization", jwtToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpsOnly: true,
      sameSite: "strict",
    });

    res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong",
      success: false,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password, role } = req.body;

    const registerUserZodSchema = zod.object({
      email: zod.string().email(),
      password: zod.string().min(5),
      role: zod.enum(["candidate", "recruiter"]),
    });

    const inputValidationResult = registerUserZodSchema.safeParse({
      email,
      password,
      role,
    });

    if (!inputValidationResult.success) {
      return res.status(400).json({
        message: "Wrong inputs provided",
        success: false,
      });
    }

    const user = await User.findOne({ email, role });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email, password or role",
        success: false,
      });
    }

    const isPasswordMathched = await bcrypt.compare(password, user.password);
    if (!isPasswordMathched) {
      return res.status(400).json({
        message: "Invalid email, password or role",
        success: false,
      });
    }

    const jwtToken = signJwtToken({ userId: user._id });
    res.cookie("authorization", jwtToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpsOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Logged in",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong",
      success: false,
    });
  }
}

function logout(req, res) {
  try {
    res.clearCookie("authorization");
    res.status(200).json({
      message: "Logged out",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong",
      success: false,
    });
  }
}

// TODO: add updated profile controller

module.exports = {
  register,
  login,
  logout,
};
