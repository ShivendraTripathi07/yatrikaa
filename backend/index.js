const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

app.use(bodyParser.json({ extended: true }));
app.use(
  cors({
    origin: "https://localhost:5173",
    Credentials: true,
  })
);

// routes

app.use("/user", userRoutes);

const PORT = 8000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log("error in connecting to database");
    console.log(err);
  }
};
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("mongodb connected");
    console.log(`server is running on port ${PORT}`);
  });
});
