import mongoose, { Mongoose } from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["INTERESTED", "IGNORED", "ACCEPTED", "REJECTED"],
        message: "{VALUE} is not a valid status",
      },
    },
  },
  { timestamps: true },
);

export const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);
