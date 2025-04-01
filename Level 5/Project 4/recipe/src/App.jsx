import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import RecipeDetails from "./RecipeDetails";  

const recipes = [
  {
    id: 1,
    title: "Chicken Chettinad Gravy",
    imageUrl: "/prd1.jpg",
    ingredients: ["Chicken", "Onions", "Tomatoes", "Chettinad Spices", "Coconut"],
    instructions: "Marinate chicken with spices. Saute onions and tomatoes. Add chicken, coconut paste, and cook until tender."
  },
  {
    id: 2,
    title: "Chicken Fried Rice",
    imageUrl: "/prd2.jpg",
    ingredients: ["Cooked Rice", "Eggs", "Soy Sauce", "Spring Onions", "Garlic"],
    instructions: "Scramble eggs, add garlic and rice. Stir-fry with soy sauce and garnish with spring onions."
  },
  {
    id: 3,
    title: "Chicken Biryani",
    imageUrl: "/prd3.jpg",
    ingredients: ["Basmati Rice", "Chicken", "Spices", "Saffron"],
    instructions: "Marinate chicken. Cook rice separately. Layer chicken and rice, then cook on dum."
  },
  {
    id: 4,
    title: "Kothu Parotta",
    imageUrl: "/prd4.jpg",
    ingredients: ["Parotta", "Egg", "Onions", "Tomatoes", "Spices"],
    instructions: "Tear parotta into pieces. Stir-fry with onions, tomatoes, eggs, and spices."
  },
  {
    id: 5,
    title: "Rava Upma",
    imageUrl: "/prd5.jpg",
    ingredients: ["Rava (Semolina)", "Mustard Seeds", "Green Chilies", "Onions", "Ghee"],
    instructions: "Roast rava. Sauté mustard seeds, onions, and chilies. Add water and mix until soft."
  }
];

function Home() {
  const [search, setSearch] = useState("");

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="container">
      <h1>🍽️ Recipe Finder</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />
      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="recipe-card">
              <img src={recipe.imageUrl} alt={recipe.title} />
              <h3>{recipe.title}</h3>
            </Link>
          ))
        ) : (
          <p className="no-results">No recipes found.</p>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails recipes={recipes} />} />
      </Routes>
    </Router>
  );
}

export default App;
