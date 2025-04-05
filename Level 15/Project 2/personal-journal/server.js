require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/personalJournal", {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

const journalSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
    tags: [String] 
});
const Journal = mongoose.model('Journal', journalSchema);


app.post('/journals', async (req, res) => {
    try {
        const journal = new Journal(req.body);
        await journal.save();
        res.status(201).json(journal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/journals', async (req, res) => {
    try {
        const journals = await Journal.find();
        res.json(journals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/journals/search', async (req, res) => {
    try {
        const { title, date, tags } = req.query;
        const query = {};
        if (title) query.title = new RegExp(title, 'i');
        if (date) query.date = { $gte: new Date(date), $lt: new Date(date + 'T23:59:59') };
        if (tags) query.tags = { $in: tags.split(',') };
        
        const journals = await Journal.find(query);
        res.json(journals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/journals/:id', async (req, res) => {
    try {
        const journal = await Journal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(journal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/journals/:id', async (req, res) => {
    try {
        await Journal.findByIdAndDelete(req.params.id);
        res.json({ message: "🗑️ Journal deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
