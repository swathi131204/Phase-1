
const express = require('express');
const app = express();

app.get('/search', (req, res) => {
  const query = req.query.q;
  const limit = req.query.limit || 5; 

  if (!query) {
    return res.send("Missing search query (q)");
  }

  res.send(`Search for: ${query}, Limit: ${limit}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
