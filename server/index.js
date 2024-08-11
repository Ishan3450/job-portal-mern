const cookieParser = require("cookie-parser");
const express = require("express");
const { connectDB } = require("./db/index");
const userRouter = require("./routes/userRoute");
const companyRouter = require("./routes/companyRoute");
const jobRouter = require("./routes/jobRoute");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/company", companyRouter);
app.use("/jobs", jobRouter);

app.listen(3000, () => {
  connectDB();
  console.log("Server started");
});
