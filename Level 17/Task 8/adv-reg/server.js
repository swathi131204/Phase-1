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

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, text: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

app.post('/api/products/seed', async (req, res) => {
  try {
    await Product.deleteMany();

    const categories = ['Electronics', 'Books', 'Clothing', 'Home'];
    const products = Array.from({ length: 20 }, (_, i) => ({
      name: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 500 + 10),
      category: categories[i % categories.length],
      stock: Math.floor(Math.random() * 100)
    }));

    const result = await Product.insertMany(products);
    res.status(201).json({ message: 'Seeded 20 products', products: result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to seed products' });
  }
});

app.get('/api/products/stats', async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          totalProducts: { $sum: 1 },
          totalStock: { $sum: '$stock' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      { $sort: { totalProducts: -1 } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

app.get('/api/products/search', async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: 'Query param q is required' });

    const results = await Product.find({ $text: { $search: q } });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

app.get('/api/products/advanced', async (req, res) => {
  try {
    const { min, max, category, sort } = req.query;

    const filter = {};
    if (min || max) filter.price = {};
    if (min) filter.price.$gte = parseFloat(min);
    if (max) filter.price.$lte = parseFloat(max);
    if (category) filter.category = category;

    let sortOption = {};
    if (sort === 'price_asc') sortOption.price = 1;
    else if (sort === 'price_desc') sortOption.price = -1;

    const products = await Product.find(filter).sort(sortOption);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Advanced query failed' });
  }
});

app.get('/api/products/average-prices', async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          avgPrice: { $avg: '$price' }
        }
      },
      { $sort: { avgPrice: -1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to calculate average prices' });
  }
});

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
