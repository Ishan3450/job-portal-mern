const { Router } = require("express");
const { register, login, logout } = require("../controllers/userController");
const {singleUpload} = require("../middlewares/multer");

const userRouter = Router();

userRouter.post("/register", singleUpload, register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

module.exports = userRouter;
