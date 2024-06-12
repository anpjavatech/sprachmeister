import mongoose from "../db/mongoose.js";
import { v4 as uuidv4 } from "uuid";

const QuestionSchema = mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4, // Automatically generate a UUID as the ID
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Questions = mongoose.model("questions", QuestionSchema);

export default Questions;
