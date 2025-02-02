import React from "react";

export default function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {movies.length > 0 &&
        movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
    </div>
  );
}
