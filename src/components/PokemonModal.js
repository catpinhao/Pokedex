import React from 'react';
import './PokemonModal.scss';

export default class PokemonModal extends React.Component {
  render() {
    const { pokemonId, pokemon, show } = this.props;
    const className = show ? 'modal-show' : 'modal-hide';
    const image = show ? pokemon.sprites.other["dream_world"].front_default : '';
    const types = show ? pokemon.types.map(entry => (
      <p className="pokemon_type" key={`${pokemonId}-${entry.type.name}`}>{entry.type.name}</p>
    )) : [];

    return (
      <div className={`pokemon_modal ${className}`}>
        <div className="modal_header">
          <div className="pokemon_id">#{("000" + pokemonId).slice (-3)}</div>
          <h2 className="pokemon_title">{pokemon.name}</h2>
          <div className="modal_close" onClick={this.props.closeModal}>&times;</div>
        </div>
        <img className="pokemon_sprite" src={image} alt={pokemon.name} />
        <div className="modal_divider" />
        <div className="pokemon_types">{types}</div>
      </div>
    );
  }
}

