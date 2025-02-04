import React from "react";

export default function SearchBar({ query, setQuery, fetchMovies }) {
  const handleSearch = () => {
    fetchMovies(); // Trigger the search action
    setQuery(""); // Clear the search bar
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
