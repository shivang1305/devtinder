import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["like", "pass", "accept", "reject"],
        message: "{VALUE} is not a valid status",
      },
      required: true,
    },
  },
  { timestamps: true },
);

// Protects against race conditions -
// prevents concurrent duplicate connection requests between same users at the same time
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (
    connectionRequest.fromUserId.toString() ===
    connectionRequest.toUserId.toString()
  ) {
    throw new Error("You cannot send connection request to yourself");
  }
  next();
});

export const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);
