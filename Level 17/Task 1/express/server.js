const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI; 

const MONGO_URI = "mongodb+srv://swathi:swathi12345@admin.z7grm.mongodb.net/?retryWrites=true&w=majority&appName=admin";

mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get('/', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.send('Connected to MongoDB');
  } else {
    res.send('Not connected to MongoDB');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
