const zod = require("zod");
const { User } = require("../db/index");
const bcrypt = require("bcrypt");
const getHashedPassowrd = require("../utils/getHashOfPassword");
const signJwtToken = require("../utils/signJwtToken");
const { getDataUri } = require("../utils/getDataUri");
const { cloudinary } = require("../utils/cloudinary");

async function register(req, res) {
  try {
    const { fullname, email, phone, password, role } = req.body;
    const profile = req.file;

    if(!profile){
      return res.status(400).json({
        message: "Please provide a profile picture",
        success: false  
      })
    }

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

    const fileUri = getDataUri(profile);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      fileUri.content,
      {
        resource_type: "auto",
      }
    );

    const createdUser = await User.create({
      fullname,
      email,
      phone,
      password: await getHashedPassowrd(password),
      role,
      profile: {
        profilePhoto: cloudinaryResponse?.secure_url,
      },
    });

    res.status(201).json({
      message: "Account created successfully",
      success: true,
      // user: {
      //   _id: createdUser._id,
      //   fullname: createdUser.fullname,
      //   email: createdUser.email,
      //   phone: createdUser.phone,
      //   role: createdUser.role,
      //   profile: createdUser.profile,
      // },
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
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profile: user.profile,
      },
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

async function update(req, res) {
  try {
    const { fullname, email, phone, bio, skills } = req.body;
    const file = req.file;
    const userId = req.userId;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // cloudinary uploading part
    let cloudinaryResponse;
    if(file){
      const fileUri = getDataUri(file);
      cloudinaryResponse = await cloudinary.uploader.upload(
        fileUri.content,
        {
          resource_type: "auto",
        }
      );  
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills;
    if (cloudinaryResponse) {
      let url = cloudinaryResponse.secure_url;

      if (file.mimetype === "application/pdf") {
        url = `${url.substring(0, url.length - 4)}.png`;
      }
      user.profile.resumeUrl = url; // storing the cloudinary url
    }

    await user.save();
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
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

module.exports = {
  register,
  login,
  logout, 
  update,
};
