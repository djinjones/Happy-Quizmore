const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;


app.use(express.json());

mongoose.connect('mongodb://localhost:27017/quiz', { useNewUrlParser: true, useUnifiedTopology: true });

const questionSchema = new mongoose.Schema({
  text: String,
  image: String, // URL of the image
  options: [String],
  correctAnswer: String,
});

const Question = mongoose.model('Question', questionSchema);

app.get('/api/questions', async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

app.post('/api/submit', async (req, res) => {
  const answers = req.body;
  const questions = await Question.find();
  let score = 0;

  questions.forEach((question) => {
    if (question.correctAnswer === answers[question._id]) {
      score++;
    }
  });

  res.json({ result: `You scored ${score} out of ${questions.length}` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
