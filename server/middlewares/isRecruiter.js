const { User } = require("../db/index");

module.exports = async (req, res, next) => {
  try {
    if (!req.userRole) {
      const userId = req.userId;
      const user = await User.findOne({ _id: userId });

      if (!user) {
        throw new Error("User not found");
      }

      req.userRole = user.role; // caching the role in the request
    }

    if (req.userRole === "candidate") {
      throw new Error("User is not a recruiter");
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Unauthorized access",
      success: false,
    });
  }
};
