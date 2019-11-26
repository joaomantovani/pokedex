import { POKEMON_API } from '../constant'

/**
 * 
 * @param {string} params Path of the URL to be concatened to the POKEMON_API
 * @param {string} filters QueryString containing filters in the url
 */
async function apiCall(params = '', filters = '') {
  // Remove duplicates
  const urlParams  = `${params}`
  const urlFilters = `${filters}`

  const url = `${POKEMON_API}/${urlParams}/${urlFilters}`.replace(/\/\//g, '/')

  const response = await fetch(url)

  return await response.json()
}

/**
 * 
 * @param {string} filters QueryString containing filters in the url 
 * 
 * @returns Example of return
 *   count: int
 *   next: string (url)
 *   previous: string (url)
 *   result: []
 */
export const getAllPokemons = (filters = '') => apiCall('pokemon', filters)

/**
 * Do a custom call using fetch to any URL
 * 
 * @param {string} url Complete URL to be called using fetch
 */
export const customCall = async (url) => {
  const response = await fetch(url)

  return await response.json()
}