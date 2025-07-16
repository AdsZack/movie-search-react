import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';

function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError(err.message || 'Gagal memuat detail.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (loading) return <p>Loading detail film...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="movie-detail">
      <img src={posterUrl} alt={movie.title} className="movie-detail-poster" />
      <div className="movie-detail-info">
        <h1>{movie.title}</h1>
        {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}
        <p><strong>Rating:</strong> ⭐ {movie.vote_average.toFixed(1)} / 10</p>
        <p><strong>Tanggal Rilis:</strong> {movie.release_date}</p>
        <div className="genres">
          {movie.genres.map(genre => (
            <span key={genre.id} className="genre-tag">{genre.name}</span>
          ))}
        </div>
        <h2>Sinopsis</h2>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetailPage;