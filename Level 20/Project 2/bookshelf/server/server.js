const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

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

const BookSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  thumbnail: String,
  status: String, 
  rating: Number,
  notes: String,
  bookId: String 
});

const Book = mongoose.model('Book', BookSchema);

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    res.json(response.data.items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

app.post('/api/books', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json(book);
});

app.get('/api/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.put('/api/books/:id', async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
});

app.delete('/api/books/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
