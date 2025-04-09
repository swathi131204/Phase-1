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
  age: Number
});

const User = mongoose.model('User', userSchema);

app.post('/api/users', async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ error: 'Please provide name, email, and age' });
  }

  try {
    const user = new User({ name, email, age });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/api/users', async (req, res) => {
  const { name, email, limit = 5, skip = 0 } = req.query;

  const filter = {};
  if (name) filter.name = new RegExp(name, 'i');
  if (email) filter.email = new RegExp(email, 'i'); 

  try {
    const users = await User.find(filter)
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(5000, () => {
  console.log('Server is running at http://localhost:5000');
});
