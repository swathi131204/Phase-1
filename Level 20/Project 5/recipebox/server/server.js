// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://swathi:swathi12345@admin.z7grm.mongodb.net/?retryWrites=true&w=majority&appName=admin";

mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const recipeSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  mealType: String,
  ingredients: [
    {
      item: String,
      quantity: Number,
      unit: String,
    },
  ],
  instructions: String,
  servings: Number,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

app.get("/recipes", async (req, res) => {
  const { search } = req.query;
  try {
    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { "ingredients.item": { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const recipes = await Recipe.find(query);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Error fetching recipes" });
  }
});

app.post("/recipes", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ error: "Error creating recipe" });
  }
});

app.get("/scale/:id/:servings", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send("Recipe not found");

    const factor = req.params.servings / recipe.servings;
    const scaled = {
      ...recipe._doc,
      ingredients: recipe.ingredients.map(i => ({
        ...i,
        quantity: Math.round(i.quantity * factor * 100) / 100,
      })),
      servings: parseInt(req.params.servings),
    };

    res.json(scaled);
  } catch (err) {
    res.status(500).json({ error: "Error scaling recipe" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
