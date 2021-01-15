import React from 'react';
import './Pokemon.scss';

export default class Pokemon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      image: '',
      generation: '',
    };

    this.handleRequest = this.handleRequest.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleRequest(pokemonId) {
    const { name } = this.props.content;

    const firstRequest = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const firstResponse = await firstRequest.json();
    const secondRequest = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
    const secondResponse = await secondRequest.json();

    this.setState({
      pokemon: firstResponse,
      image: firstResponse.sprites.other["dream_world"].front_default,
      generation: secondResponse.generation.name,
    });
  }

  handleClick() {
    const { pokemonId } = this.props;
    const { pokemon } = this.state;
    this.props.handleModal(pokemonId, pokemon);
  }

  componentDidMount() {
    const { pokemonId } = this.props;
    this.handleRequest(pokemonId);
  }

  render() {
    const { content, pokemonId } = this.props;
    const { image, generation } = this.state;
    const genNumber = generation.split('-').pop().toUpperCase();

    return (
      <div className={`pokemon_card gen-${genNumber}`} onClick={this.handleClick}>
        <div className="left_wrapper">
          <p className="pokemon_name">{content.name}</p>
          <p className="pokemon_generation">Generation {genNumber}</p>
        </div>
        <div className="right_wrapper">
          <p className="pokemon_id">#{("000" + pokemonId).slice (-3)}</p>
          <img className="pokemon_sprite" src={image} alt={content.name} />
        </div>
      </div>
    );
  }
}
