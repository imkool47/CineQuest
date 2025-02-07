import React from "react";

export default function MovieDetailsModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Overview:</strong> {movie.overview}
        </p>
        <p>
          <strong>Rating:</strong> {movie.vote_average} / 10
        </p>
      </div>
    </div>
  );
}
