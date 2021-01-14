import React from 'react';
import './App.scss';
import PokedexList from './PokedexList';

export default class App extends React.Component {
  render() {
    return (
      <div className="pokedex">
        <header className="pokedex_header">
          <h1>Pokédex</h1>
        </header>

        <PokedexList />
      </div>
    );
  }
}
