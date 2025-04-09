
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
  name: String,
  purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

const productSchema = new mongoose.Schema({
  name: String,
  stock: Number,
  price: Number
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  totalAmount: Number,
  status: { type: String, default: 'pending' }
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.statusCode || 500).json({ error: err.message });
});

app.post('/api/orders', async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, products } = req.body;

    const user = await User.findById(userId).session(session);
    if (!user) throw new AppError("User not found", 404);

    let totalAmount = 0;
    const productUpdates = [];

    for (const item of products) {
      const product = await Product.findById(item.product).session(session);
      if (!product) throw new AppError(`Product not found: ${item.product}`, 404);
      if (product.stock < item.quantity) throw new AppError(`Not enough stock for: ${product.name}`, 400);

      product.stock -= item.quantity;
      totalAmount += product.price * item.quantity;
      productUpdates.push(product.save({ session }));
    }

    const order = new Order({
      user: user._id,
      products,
      totalAmount,
      status: 'confirmed'
    });

    await order.save({ session });
    user.purchaseHistory.push(order._id);
    await user.save({ session });
    await Promise.all(productUpdates);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
});

app.post('/api/seed', async (req, res) => {
  await User.deleteMany();
  await Product.deleteMany();

  const user = await User.create({ name: 'Swathi' });
  const products = await Product.insertMany([
    { name: 'Laptop', price: 1000, stock: 5 },
    { name: 'Phone', price: 500, stock: 10 }
  ]);

  res.json({ user, products });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
