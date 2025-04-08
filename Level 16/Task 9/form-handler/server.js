const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send(`
    <h2>Contact Form</h2>
    <form method="POST" action="/submit">
      <label>Name:</label><br>
      <input type="text" name="name"><br><br>
      
      <label>Email:</label><br>
      <input type="email" name="email"><br><br>
      
      <label>Message:</label><br>
      <textarea name="message"></textarea><br><br>
      
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.send(`
      <h3 style="color:red;">Error: All fields are required!</h3>
      <a href="/">Go back to form</a>
    `);
  }

  res.send(`
    <h3 style="color:green;">Form submitted successfully!</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
    <a href="/">Submit another</a>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
