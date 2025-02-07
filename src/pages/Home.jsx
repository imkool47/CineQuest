import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import TopMovies from "../components/TopMovies";
import RandomMovie from "../components/RandomMovie";
import Pagination from "../components/Pagination";
import TrendingMovies from "../components/TrendingMovies"; // Import TrendingMovies component

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [topMovies, setTopMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false); // State to track search

  const resultsPerPage = 8; // Show 8 results per page

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

      // Calculate total pages based on resultsPerPage
      setTotalPages(Math.ceil(res.data.results.length / resultsPerPage));
      setCurrentPage(1); // Reset to first page after a new search
      setSearchPerformed(true); // Update when a search is performed
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

  const fetchTopMovies = async () => {
    try {
      const res = await axios.get(`${API_URL}/movie/top_rated`, {
        params: { api_key: API_KEY },
      });
      const topMoviesList = res.data.results.slice(0, 8);
      setTopMovies(topMoviesList);

      // Check Local Storage for Movie of the Day
      const storedMovie = JSON.parse(localStorage.getItem("randomMovie"));
      const storedDate = localStorage.getItem("randomMovieDate");
      const today = new Date().toISOString().split("T")[0];

      if (storedMovie && storedDate === today) {
        setRandomMovie(storedMovie);
      } else {
        const newRandomMovie =
          res.data.results[Math.floor(Math.random() * res.data.results.length)];

        setRandomMovie(newRandomMovie);
        localStorage.setItem("randomMovie", JSON.stringify(newRandomMovie));
        localStorage.setItem("randomMovieDate", today);
      }
    } catch (error) {
      console.error("Error fetching top movies", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); // Update the current page
    }
  };

  // Get the movies to display for the current page
  const paginatedMovies = movies.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <div className="container">
      <h1>CineQuest 🎬</h1>
      <SearchBar query={query} setQuery={setQuery} fetchMovies={fetchMovies} />
      {/* Render movies only if a search has been performed */}
      {searchPerformed && <MovieList movies={paginatedMovies} query={query} />}
      {/* Show pagination only after searching */}
      {searchPerformed && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <RandomMovie randomMovie={randomMovie} />
      <TrendingMovies />
      <TopMovies topMovies={topMovies} />
    </div>
  );
}
