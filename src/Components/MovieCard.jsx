import { Link } from 'react-router-dom'

export default function MovieCard({ movie, search }) {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A'
  return (
    <article className="movie-card">
      <div className="poster-wrap">
        {hasPoster ? <img src={movie.Poster} alt={`${movie.Title} poster`} /> : <div className="poster-placeholder" aria-label="Poster unavailable">No poster</div>}
        <span className="type-tag">{movie.Type}</span>
      </div>
      <div className="card-copy">
        <p className="movie-year">{movie.Year}</p>
        <h2>{movie.Title}</h2>
        <Link className="more-link" to={`/info/${movie.imdbID}?search=${encodeURIComponent(search)}`}>
          More info <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
