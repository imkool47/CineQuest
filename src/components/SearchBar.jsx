export default function SearchBar({ query, setQuery, fetchMovies }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchMovies}>Search</button>
    </div>
  );
}
