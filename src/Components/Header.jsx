import { Link } from 'react-router-dom'

export default function Header({ compact = false }) {
  return (
    <header className={compact ? 'site-header compact' : 'site-header'}>
      <Link className="brand" to="/" aria-label="L.A VOD home">
        <span className="brand-mark" aria-hidden="true">LA</span>
        <span>L.A VOD</span>
      </Link>
      <span className="header-note">MOVIE DISCOVERY</span>
    </header>
  )
}
