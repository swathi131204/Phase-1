import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    cuisine: "Tamil Nadu",
    mealType: "",
    ingredients: [{ item: "", quantity: 1, unit: "" }],
    instructions: "",
    servings: 1,
  });

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/recipes");
      setRecipes(res.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, e) => {
    const updated = [...form.ingredients];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, ingredients: updated });
  };

  const addIngredientField = () => {
    setForm({
      ...form,
      ingredients: [...form.ingredients, { item: "", quantity: 1, unit: "" }],
    });
  };

  const submitRecipe = async () => {
    try {
      await axios.post("http://localhost:5000/recipes", form);
      fetchRecipes();
      setForm({
        name: "",
        cuisine: "Tamil Nadu",
        mealType: "",
        ingredients: [{ item: "", quantity: 1, unit: "" }],
        instructions: "",
        servings: 1,
      });
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>🍛 RecipeBox - Tamil Nadu Specials</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Search by recipe name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="recipes-section">
        <h2>📜 All Recipes</h2>
        {filteredRecipes.map((r) => (
          <div key={r._id} className="recipe-card">
            <h3>{r.name}</h3>
            <p><strong>Cuisine:</strong> {r.cuisine}</p>
            <p><strong>Meal Type:</strong> {r.mealType}</p>
            <p><strong>Servings:</strong> {r.servings}</p>
            <p><strong>Instructions:</strong> {r.instructions}</p>
            <ul>
              {r.ingredients.map((ing, i) => (
                <li key={i}>
                  {ing.quantity} {ing.unit} {ing.item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
