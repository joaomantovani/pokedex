import React, { useState, useEffect } from 'react';
import './App.css';
import { getAllPokemons } from './services/fetchPokemon'
import { renderPage, getUrlParameter } from './helpers/pagination'

function App() {
  const [Pokemons, setPokemons] = useState([])
  const [Count, setCount] = useState(0)
  const [Next, setNext] = useState('')
  const [Previous, setPrevious] = useState('')
  const [ActualPage, setActualPage] = useState(1)
  const [Pages, setPages] = useState(1)

  useEffect(() => {
    getAllPokemons()
    .then(({results, count, next, previous}) => {
      setPokemons(results)
      setCount(count)
      setNext(next)
      setPrevious(previous)
      setPages(Math.round(count / 20))
    })
  }, [])

  useEffect(() => {
    const offset = getUrlParameter('offset', Next) || 1
    const limit = getUrlParameter('limit', Next) || 1

    setActualPage(offset / limit)
  }, [Next, Previous])

  const changePage = (Page) => {
    renderPage(Page)
      .then(({results, count, next, previous}) => {
        setPokemons(results)
        setCount(count)
        setNext(next)
        setPrevious(previous)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {
            Pokemons.map(({name, url}) => (
              <li key={name}>
                <a href={url}>{name}</a>
              </li>
            ))
          }
        </ul>
        
        { Next !== null && 
          <button onClick={() => changePage(Next)}>
            Next
          </button> 
        }

        { Previous !== null && 
          <button onClick={() => changePage(Previous)}>
            Previous
          </button> 
        } 

        <p>Page { ActualPage } from { Pages }</p>
        <p>Number of pokemons: { Count }</p>

      </header>
    </div>
  );
}

export default App;
