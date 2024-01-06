import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB Connected!! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("MongoDB connection FAILED ", err);
    process.exit(1);
  }
};
