import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import InfoPage from './Pages/InfoPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/info/:imdbID" element={<InfoPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
