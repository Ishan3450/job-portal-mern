const cookieParser = require("cookie-parser");
const express = require("express");
const { connectDB } = require("./db/index");
const userRouter = require("./routes/userRoute");
const companyRouter = require("./routes/companyRoute");
const jobRouter = require("./routes/jobRoute");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
};
app.use(cors(corsOptions));
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
