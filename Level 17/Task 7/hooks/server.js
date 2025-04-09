const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const MONGO_URI = "mongodb+srv://swathi:swathi12345@admin.z7grm.mongodb.net/?retryWrites=true&w=majority&appName=admin";

mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
});
const User = mongoose.model('User', userSchema);

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Post = mongoose.model('Post', postSchema);

app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

app.post('/api/posts', async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const user = await User.findById(author);
    if (!user) return res.status(404).json({ error: 'Author not found' });

    const post = new Post({ title, content, author });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create post' });
  }
});

app.get('/api/posts', async (req, res) => {
  const { author } = req.query;
  const filter = {};

  if (author) filter.author = author;

  try {
    const posts = await Post.find(filter).populate('author', 'name email');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/api/users/:id/posts', async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  try {
    const posts = await Post.find({ author: id }).populate('author', 'name email');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error getting user posts' });
  }
});

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
