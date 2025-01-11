import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: [1, "title cannot be empty"],
    },
    color: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subTodos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTodo",
      },
    ],
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
