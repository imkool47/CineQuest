import React from "react";

export default function MovieList({ movies }) {
  return (
    <div>
      <h2>🎥 Search Results</h2>
      {movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found . Try searching for something else!</p>
      )}
    </div>
  );
}
