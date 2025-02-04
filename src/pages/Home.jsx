import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import TopMovies from "../components/TopMovies";
import RandomMovie from "../components/RandomMovie";
import Pagination from "../components/Pagination";

const API_KEY = "09343d287d3cf75b18d5740356398ac1";
const API_URL = "https://api.themoviedb.org/3";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [topMovies, setTopMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchPerformed, setSearchPerformed] = useState(false); // State to track search

  useEffect(() => {
    fetchTopMovies();
  }, []);

  const fetchMovies = async (page = 1) => {
    if (!query) return;
    try {
      const res = await axios.get(`${API_URL}/search/movie`, {
        params: { api_key: API_KEY, query, page },
      });
      setMovies(res.data.results);
      setTotalPages(res.data.total_pages);
      setNotFound(res.data.results.length === 0);
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
      const topMoviesList = res.data.results.slice(0, 5);
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
    setCurrentPage(newPage);
    fetchMovies(newPage);
  };

  return (
    <div className="container">
      <h1>CineQuest 🎬</h1>
      <SearchBar
        query={query}
        setQuery={setQuery}
        fetchMovies={() => fetchMovies(1)}
      />
      {/* {notFound && (
        <p className="error-message">No movies found for "{query}"</p>
      )} */}

      {/* Render movies only if a search has been performed */}
      {searchPerformed && <MovieList movies={movies} query={query} />}

      {/* Show pagination only after searching */}
      {searchPerformed && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <TopMovies topMovies={topMovies} />
      <RandomMovie randomMovie={randomMovie} />
    </div>
  );
}
