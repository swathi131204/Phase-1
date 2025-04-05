
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;


const MONGO_URI = "mongodb+srv://swathi:swathi12345@admin.z7grm.mongodb.net/?retryWrites=true&w=majority&appName=admin";

mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: String,
    group: String,
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

app.post('/api/contacts', async (req, res) => {
    try {
        const { name, email, phone, address, group } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ message: "Name, email, and phone are required" });
        }
        const contact = new Contact({ name, email, phone, address, group });
        await contact.save();
        res.status(201).json(contact);
    } catch (err) {
        res.status(500).json({ message: "Error creating contact", error: err.message });
    }
});

app.get('/api/contacts', async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

app.get('/api/contacts/search', async (req, res) => {
    const { name, group } = req.query;
    let filter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (group) filter.group = group;

    const contacts = await Contact.find(filter);
    res.json(contacts);
});

app.put('/api/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) return res.status(404).json({ message: "Contact not found" });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: "Error updating contact", error: err.message });
    }
});

app.delete('/api/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: "❌ Contact not found" });
        res.json({ message: "✅ Contact deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting contact", error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
