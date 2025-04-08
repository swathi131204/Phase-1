
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to our homepage!');
});

app.get('/about', (req, res) => {
  res.send('About Us page');
});

app.get('/contact', (req, res) => {
  res.send('Contact Us page');
});

app.get('/services', (req, res) => {
  res.send('Our Services page');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
