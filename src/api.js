const API_KEYS = ['5a292f28', '90781f94']
const API_ROOT = 'https://www.omdbapi.com/'

async function request(params) {
  let lastError
  for (const key of API_KEYS) {
    try {
      const response = await fetch(`${API_ROOT}?${new URLSearchParams({ ...params, apikey: key })}`)
      if (!response.ok) throw new Error('The movie service is unavailable right now.')
      const data = await response.json()
      if (data.Response === 'True') return data
      lastError = new Error(data.Error || 'We could not find that movie.')
    } catch (error) {
      lastError = error
    }
  }
  throw lastError || new Error('Something went wrong. Please try again.')
}

export function searchMovies(query) {
  return request({ s: query })
}

export function getMovie(imdbID) {
  return request({ i: imdbID, plot: 'full' })
}
