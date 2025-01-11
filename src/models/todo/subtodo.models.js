import mongoose from "mongoose";

const subTodoSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

export const SubTodo = mongoose.model("SubTodo", subTodoSchema);
