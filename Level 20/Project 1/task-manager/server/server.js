const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());



const MONGO_URI = "mongodb+srv://swathi:swathi12345@admin.z7grm.mongodb.net/taskmaster?retryWrites=true&w=majority&appName=admin";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const taskSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  dueDate: String,
  completed: Boolean,
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  res.json({ message: 'User registered' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secretkey');
  res.json({ token });
});

app.get('/api/tasks', authenticateToken, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.userId });
  res.json(tasks);
});

app.post('/api/tasks', authenticateToken, async (req, res) => {
  const { title, description, dueDate } = req.body;
  const task = new Task({ userId: req.user.userId, title, description, dueDate, completed: false });
  await task.save();
  res.json(task);
});

app.put('/api/tasks/:id', authenticateToken, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    req.body,
    { new: true }
  );
  res.json(task);
});

app.delete('/api/tasks/:id', authenticateToken, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
  res.json({ message: 'Task deleted' });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
