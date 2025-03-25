import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import axios from "axios";
import "./App.css";

const API_KEY = "71bcad0bb0364c50bbaf1b84dd466d8b";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const cachedRecipes = localStorage.getItem("popularRecipes");
      if (cachedRecipes) {
        setRecipes(JSON.parse(cachedRecipes));
      } else {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?number=9&tags=vegetarian&apiKey=${API_KEY}`
        );
        setRecipes(response.data.recipes);
        localStorage.setItem("popularRecipes", JSON.stringify(response.data.recipes));
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="home">
      <h1>Popular Vegetarian Recipes</h1>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchRecipes = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`
    );
    setResults(response.data.results);
  };

  return (
    <div className="search">
      <h1>Search Recipes</h1>
      <form onSubmit={searchRecipes}>
        <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <div className="recipe-grid">
        {results.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/search">Search</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
