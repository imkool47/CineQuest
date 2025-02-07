import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export default function TrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const res = await axios.get(`${API_URL}/trending/movie/day`, {
        params: { api_key: API_KEY },
      });
      setTrendingMovies(res.data.results.slice(0, 8)); // Display 8 trending movies
    } catch (error) {
      console.error("Error fetching trending movies", error);
    }
  };

  return (
    <div className="trending-movies">
      <h2>Trending Movies 🌟</h2>
      <div className="trending-movies-grid">
        {trendingMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
