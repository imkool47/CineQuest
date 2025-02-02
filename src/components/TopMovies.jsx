import React from "react";

export default function TopMovies({ topMovies }) {
  return (
    <div className="top-movies">
      <h2>🔥 Top Rated Movies</h2>
      {topMovies.map((movie) => (
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
