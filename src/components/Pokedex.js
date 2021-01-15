import React from 'react';
import './Pokedex.scss';
import PokedexList from './PokedexList';

export default class Pokedex extends React.Component {
  render() {
    return (
      <div className="pokedex">
        <header className="pokedex_header">
          <h1>Catarina's Pokédex</h1>
        </header>

        <PokedexList />
      </div>
    );
  }
}
