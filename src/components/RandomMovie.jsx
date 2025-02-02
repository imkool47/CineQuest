import React from "react";

export default function RandomMovie({ randomMovie }) {
  return (
    <div className="random-movie">
      <h2>Movie of the Day</h2>
      {randomMovie && <p>{randomMovie.title}</p>}
    </div>
  );
}
