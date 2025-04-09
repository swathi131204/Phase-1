const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

const MONGO_URI = "mongodb+srv://swathi:swathi12345@admin.z7grm.mongodb.net/?retryWrites=true&w=majority&appName=admin";

mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email']
  },
  age: {
    type: Number,
    min: [18, 'Age must be at least 18']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

app.get('/user-schema', (req, res) => {
  res.json(Object.keys(User.schema.paths));
});

app.post('/add-user', async (req, res) => {
  try {
    const userData = req.body; 
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    res.status(201).json({
      message: 'User created successfully',
      user: savedUser
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create user',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
