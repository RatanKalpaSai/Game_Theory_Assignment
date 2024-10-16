import mongoose from "mongoose";
import dotenv from "dotenv";

// backend/config/db.js
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (error) {
    console.log("Error");
    process.exit(1);
  }
};

export default connectDB;
