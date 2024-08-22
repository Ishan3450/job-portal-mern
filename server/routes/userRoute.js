const { Router } = require("express");
const { register, login, logout, update } = require("../controllers/userController");
const {singleUpload} = require("../middlewares/multer");
const isLoggedIn = require("../middlewares/isLoggedIn");

const userRouter = Router();

userRouter.post("/register", singleUpload, register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.put("/profile/update", singleUpload, isLoggedIn, update);

module.exports = userRouter;
