const express = require('express');
const app = express();
const port = 3000;

const isDev = app.get('env') === 'development';

app.get('/', (req, res) => {
  res.send('<h2>Welcome to the homepage!</h2>');
});

app.get('/error', (req, res, next) => {
  const err = new Error('Something went wrong manually!');
  err.status = 500;
  next(err);
});

app.get('/products/:id', (req, res, next) => {
  const product = null; 
  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }
});

app.use((req, res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;

  if (req.path.startsWith('/api')) {
    return res.status(status).json({
      error: {
        message: err.message,
        ...(isDev && { stack: err.stack }),
      },
    });
  }

  res.status(status).send(`
    <h2 style="color:red;">Error: ${err.message}</h2>
    ${isDev ? `<pre>${err.stack}</pre>` : ''}
    <a href="/">Back to Home</a>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
