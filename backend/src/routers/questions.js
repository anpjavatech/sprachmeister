import express from "express";
import Questions from "../models/question.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/questions", auth, async (req, res) => {
  const questionsModel = new Questions(req.body);
  try {
    const question = await questionsModel.save();
    res.send({ question });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/questions", auth, async (req, res) => {
  try {
    const type = req.query.type;
    const randomQuestions = await getRandomUsers(
      Number(req.query.limit || 10),
      type
    );
    res.send({ randomQuestions });
  } catch (error) {
    res.status(400).send({ error: err.message });
  }
});

const getRandomUsers = async (num, questionType) => {
  try {
    const randomQues = await Questions.aggregate([
      { $match: { type: questionType } },
      { $sample: { size: num } },
    ]);
    return randomQues;
  } catch (error) {
    console.error("Error retrieving random users:", error);
    throw error;
  }
};

export default router;
