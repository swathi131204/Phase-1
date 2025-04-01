import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "a3e46a1a"; 

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
        );

        if (response.data.Response === "True") {
          setMovies(response.data.Search);
        } else {
          setMovies([]);
          setError("No movies found. Try a different search.");
        }
      } catch (err) {
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchMovies();
    }, 500); 

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <div className="container">
      <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} />
            <p>{movie.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
