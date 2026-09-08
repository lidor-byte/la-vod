import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Components/Header'
import MovieCard from '../Components/MovieCard'
import SearchForm from '../Components/SearchForm'
import StatusMessage from '../Components/StatusMessage'
import { searchMovies } from '../api'

export default function HomePage() {
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [searchedQuery, setSearchedQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function runSearch(value) {
    const trimmed = value.trim()
    setError('')
    if (!trimmed) {
      setMovies([])
      setSearchedQuery('')
      setError('Enter a movie title to begin your search.')
      return
    }
    setLoading(true)
    setSearchedQuery(trimmed)
    try {
      const data = await searchMovies(trimmed)
      setMovies(data.Search || [])
    } catch (requestError) {
      setMovies([])
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  function handleSearch() {
    runSearch(query)
  }

  useEffect(() => {
    const returningQuery = new URLSearchParams(location.search).get('search')
    if (returningQuery) {
      setQuery(returningQuery)
      runSearch(returningQuery)
    }
  }, [location.search])

  return (
    <main>
      <section className="hero">
        <Header />
        <div className="hero-content">
          <p className="eyebrow">CURATED FOR YOUR NEXT NIGHT IN</p>
          <h1>Find the story<br /><em>that stays with you.</em></h1>
          <p className="hero-subtitle">Search thousands of films, then settle into something unforgettable.</p>
          <SearchForm query={query} onQueryChange={setQuery} onSearch={handleSearch} loading={loading} />
        </div>
        <p className="hero-number" aria-hidden="true">01 — 26</p>
      </section>
      <section className="results-section" aria-live="polite">
        <div className="results-heading">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>{searchedQuery ? `Results for “${searchedQuery}”` : 'Start exploring'}</h2>
          </div>
          {movies.length > 0 && <span className="result-count">{movies.length} titles</span>}
        </div>
        {loading && <StatusMessage>Finding the best matches…</StatusMessage>}
        {!loading && error && <StatusMessage type="error">{error}</StatusMessage>}
        {!loading && !error && movies.length > 0 && <div className="movie-grid">{movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} search={searchedQuery} />)}</div>}
        {!loading && !error && !searchedQuery && <p className="empty-copy">A good film is only a search away.</p>}
      </section>
    </main>
  )
}
