/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/quiz', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.json({ success: true });
  } catch (error) {
    if (error.code === 11000) {
      res.json({ success: false, message: 'Username or email already exists.' });
    } else {
      res.json({ success: false, message: 'Signup failed. Please try again.' });
    }
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
    res.json({ success: true, token });
  } else {
    res.json({ success: false, message: 'Invalid username or password.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
