import React from "react";

export default function RandomMovie({ randomMovie }) {
  return (
    <div className="random-movie">
      <h2>🎥 Movie of the Day</h2>
      {randomMovie && (
        <div>
          <h3>{randomMovie.title}</h3>
          <img
            src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`}
            alt={randomMovie.title}
          />
          <p>{randomMovie.overview}</p>
        </div>
      )}
    </div>
  );
}
