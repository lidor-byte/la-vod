import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '../Components/Header'
import StatusMessage from '../Components/StatusMessage'
import { getMovie } from '../api'

export default function InfoPage() {
  const { imdbID } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const query = new URLSearchParams(location.search).get('search')
  const backToResults = () => navigate(query ? `/?search=${encodeURIComponent(query)}` : '/')

  useEffect(() => {
    let active = true
    setLoading(true)
    getMovie(imdbID)
      .then((data) => active && setMovie(data))
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [imdbID])

  const hasPoster = movie?.Poster && movie.Poster !== 'N/A'
  return (
    <main className="info-page">
      <Header compact />
      <div className="detail-shell">
        <button className="back-button" onClick={backToResults}>← Back to results</button>
        {loading && <StatusMessage>Loading film details…</StatusMessage>}
        {!loading && error && <StatusMessage type="error">{error}<Link to="/">Return home</Link></StatusMessage>}
        {!loading && movie && <article className="movie-detail">
          <div className="detail-poster">{hasPoster ? <img src={movie.Poster} alt={`${movie.Title} poster`} /> : <div className="poster-placeholder">No poster available</div>}</div>
          <div className="detail-copy">
            <p className="eyebrow">{movie.Year} · {movie.Rated !== 'N/A' ? movie.Rated : 'UNRATED'}</p>
            <h1>{movie.Title}</h1>
            <div className="facts"><span><b>IMDb</b> {movie.imdbRating !== 'N/A' ? movie.imdbRating : '—'}<small>/10</small></span><span>{movie.Runtime !== 'N/A' ? movie.Runtime : 'Runtime unknown'}</span></div>
            <p className="plot">{movie.Plot !== 'N/A' ? movie.Plot : 'No plot description is available for this title.'}</p>
            <dl><div><dt>Starring</dt><dd>{movie.Actors !== 'N/A' ? movie.Actors : 'Not available'}</dd></div><div><dt>Director</dt><dd>{movie.Director !== 'N/A' ? movie.Director : 'Not available'}</dd></div><div><dt>Genre</dt><dd>{movie.Genre !== 'N/A' ? movie.Genre : 'Not available'}</dd></div></dl>
          </div>
        </article>}
      </div>
    </main>
  )
}
