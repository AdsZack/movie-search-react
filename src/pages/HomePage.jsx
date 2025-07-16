import { useState } from "react";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";

function HomePage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;

    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError(err.message || "Gagal memuat film. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari Film..."
        />
        <button type="submit">Cari</button>
      </form>

      <div className="movie-list">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;