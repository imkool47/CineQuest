import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import TopMovies from "../components/TopMovies";
import RandomMovie from "../components/RandomMovie";

const API_KEY = "YOUR_TMDB_API_KEY";
const API_URL = "https://api.themoviedb.org/3";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [topMovies, setTopMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);

  useEffect(() => {
    fetchTopMovies();
  }, []);

  const fetchMovies = async () => {
    if (!query) return;
    try {
      const res = await axios.get(`${API_URL}/search/movie`, {
        params: { api_key: API_KEY, query },
      });
      setMovies(res.data.results);
      setNotFound(res.data.results.length === 0);
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  const fetchTopMovies = async () => {
    try {
      const res = await axios.get(`${API_URL}/movie/top_rated`, {
        params: { api_key: API_KEY },
      });
      setTopMovies(res.data.results.slice(0, 5));
      setRandomMovie(
        res.data.results[Math.floor(Math.random() * res.data.results.length)]
      );
    } catch (error) {
      console.error("Error fetching top movies", error);
    }
  };

  return (
    <div className="container">
      <h1>Movie Search App</h1>
      <SearchBar query={query} setQuery={setQuery} fetchMovies={fetchMovies} />
      {notFound && (
        <p className="error-message">No movies found for "{query}"</p>
      )}
      <MovieList movies={movies} />
      <TopMovies topMovies={topMovies} />
      <RandomMovie randomMovie={randomMovie} />
    </div>
  );
}
