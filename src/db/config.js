import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";

export const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
};
