import React from 'react';
import './App.css';
import PokedexList from './PokedexList';

export default class App extends React.Component {
  render() {
    return (
      <div className="pokedex">
        <header className="pokedex_header">
          <h1>Pokédex</h1>
        </header>

        <section className="pokedex_wrapper">
          <PokedexList />
        </section>
      </div>
    );
  }
}
