// Load dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// App setup
const app = express();
const PORT = 5000;
app.use(bodyParser.json());

// ✅ Corrected MongoDB Connection String (Use Lowercase db name)
const MONGO_URI = "mongodb+srv://swathi:swathi12345@admin.z7grm.mongodb.net/?retryWrites=true&w=majority&appName=admin";

mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
  
// ✅ Schema & Model
const transactionSchema = new mongoose.Schema({
    type: { type: String, enum: ["income", "expense"], required: true },
    amount: { type: Number, required: true },
    category: String,
    date: { type: Date, default: Date.now },
    note: String,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// ✅ Route: Add a transaction
app.post("/transactions", async (req, res) => {
    try {
        const { type, amount, category, date, note } = req.body;

        if (!["income", "expense"].includes(type) || amount <= 0) {
            return res.status(400).json({ message: "Invalid data" });
        }

        const newTx = new Transaction({ type, amount, category, date, note });
        await newTx.save();
        res.status(201).json({ message: "✅ Transaction added", data: newTx });
    } catch (err) {
        res.status(500).json({ message: "❌ Error adding transaction", error: err });
    }
});

// ✅ Route: Get all transactions
app.get("/transactions", async (req, res) => {
    try {
        const { start, end, category } = req.query;
        let filter = {};

        if (start && end) {
            filter.date = { $gte: new Date(start), $lte: new Date(end) };
        }
        if (category) {
            filter.category = category;
        }

        const txs = await Transaction.find(filter).sort({ date: -1 });
        res.json(txs);
    } catch (err) {
        res.status(500).json({ message: "❌ Error fetching transactions", error: err });
    }
});

// ✅ Route: Get summary (total income, expense, balance)
app.get("/summary", async (req, res) => {
    try {
        const txs = await Transaction.find();
        const summary = {
            total_income: 0,
            total_expense: 0,
            balance: 0,
        };

        txs.forEach(tx => {
            if (tx.type === "income") summary.total_income += tx.amount;
            else summary.total_expense += tx.amount;
        });

        summary.balance = summary.total_income - summary.total_expense;
        res.json(summary);
    } catch (err) {
        res.status(500).json({ message: "❌ Error generating summary", error: err });
    }
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
