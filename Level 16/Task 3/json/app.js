
const express = require('express');
const app = express();

const users = [
  { id: 1, name: 'Swetha', email: 'swetha@example.com' },
  { id: 2, name: 'sriram', email: 'sri@example.com' },
  { id: 3, name: 'balaji', email: 'balaji@example.com' }
];

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
