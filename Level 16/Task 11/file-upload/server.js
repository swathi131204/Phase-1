const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
                  allowedTypes.test(file.mimetype);
  cb(isValid ? null : new Error('Only image files allowed'), isValid);
};

const upload = multer({ storage, fileFilter });

app.get('/', (req, res) => {
  res.send(`
    <h2>Upload Image</h2>
    <form method="POST" action="/upload" enctype="multipart/form-data">
      <input type="file" name="image"><br><br>
      <button type="submit">Upload</button>
    </form>
  `);
});

app.post('/upload', upload.single('image'), (req, res) => {
  res.send(`
    <h3>Upload Successful</h3>
    <p>File: ${req.file.filename}</p>
    <p>Saved in: uploads/</p>
  `);
});

app.use((err, req, res, next) => {
  res.send(`<h3 style="color:red;">Error: ${err.message}</h3>`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const fs = require('fs');

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}
