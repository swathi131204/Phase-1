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
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true }
});

const User = mongoose.model('User', userSchema);

app.post('/api/users', async (req, res) => {
  const { name, email, age } = req.body;

  // Validate request body
  if (!name || !email || !age) {
    return res.status(400).json({ error: 'Name, email, and age are required' });
  }

  try {
    const newUser = new User({ name, email, age });
    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
