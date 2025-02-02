import React from "react";

export default function SearchBar({ query, setQuery, fetchMovies }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && fetchMovies()}
      />
      <button onClick={fetchMovies}>Search</button>
    </div>
  );
}
