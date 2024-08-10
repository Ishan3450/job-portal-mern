const cookieParser = require("cookie-parser");
const express = require("express");
const {connectDB} = require("./db/index");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  connectDB();
  console.log("Server started");
});
