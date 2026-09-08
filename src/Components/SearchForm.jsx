import { useEffect, useRef } from 'react'

export default function SearchForm({ query, onQueryChange, onSearch, loading }) {
  const inputRef = useRef(null)
  useEffect(() => inputRef.current?.focus(), [])

  function submit(event) {
    event.preventDefault()
    onSearch()
  }

  return (
    <form className="search-form" onSubmit={submit}>
      <label className="sr-only" htmlFor="movie-search">Search for a movie</label>
      <input
        ref={inputRef}
        id="movie-search"
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Try “The Grand Budapest Hotel”"
        autoComplete="off"
      />
      <button type="submit" disabled={loading}>
        <span>{loading ? 'Searching' : 'Search'}</span>
        {!loading && <span aria-hidden="true">↗</span>}
      </button>
    </form>
  )
}
