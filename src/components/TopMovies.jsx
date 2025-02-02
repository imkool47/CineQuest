import MovieCard from "./MovieCard";

export default function TopMovies({ topMovies }) {
  return (
    <div>
      <h2>Top Rated Movies</h2>
      <div className="movie-list">
        {topMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
