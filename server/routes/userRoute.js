const { Router } = require("express");
const { register, login, logout } = require("../controllers/userController");

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

module.exports = userRouter;
