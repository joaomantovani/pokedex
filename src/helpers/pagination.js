import { customCall } from '../services/fetchPokemon'

/**
 * Load the next page basead on the new URL
 * 
 * @param {string} url URL from pokeapi to change pages
 */
export const renderPage = (url) => customCall(url)

/**
 * With the function above, you can get individual parameter values
 * 
 * @param {string} name Name of the param to get from queryString
 * @param {string} url URL which contains a queryString
 */
export const getUrlParameter = (name, url) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  const results = regex.exec(url)

  return results === null 
    ? '' 
    : decodeURIComponent(results[1].replace(/\+/g, ' '))
}