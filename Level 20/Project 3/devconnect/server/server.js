const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://swathi:swathi12345@admin.z7grm.mongodb.net/?retryWrites=true&w=majority&appName=admin";

mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const profileSchema = new mongoose.Schema({
  name: String,
  skills: String,
  bio: String,
  image: String,
});
const Profile = mongoose.model("Profile", profileSchema);

const postSchema = new mongoose.Schema({
  author: String,
  content: String,
  likes: { type: Number, default: 0 },
  comments: [{ text: String }]
});
const Post = mongoose.model("Post", postSchema);

app.get("/api/profiles", async (req, res) => {
  const data = await Profile.find();
  res.json(data);
});

app.post("/api/profiles", async (req, res) => {
  const profile = new Profile(req.body);
  await profile.save();
  res.json(profile);
});

app.get("/api/posts", async (req, res) => {
  const data = await Post.find();
  res.json(data);
});

app.post("/api/posts", async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
});

app.put("/api/posts/:id/like", async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes += 1;
  await post.save();
  res.json(post);
});

app.post("/api/posts/:id/comment", async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push(req.body);
  await post.save();
  res.json(post);
});

app.listen(5000, () => console.log("Server running on port 5000"));
