import React from 'react';
import './Pokemon.scss';

export default class Pokemon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      image: '',
      generation: '',
      pokemonId: 0,
    };

    this.handleRequest = this.handleRequest.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleRequest(pokemonId) {
    const { name } = this.props.content;
    const self = this;
    let newState = {
      pokemon: [],
      image: '',
      generation: '',
      pokemonId,
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(res => {
        newState.pokemon = res;
        newState.image = res.sprites.other["dream_world"].front_default;
      }).then(
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
          .then(newRes => newRes.json())
          .then(newRes => {
            newState.generation = newRes.generation.name;
            self.setState(newState);
          })
      );
  }

  handleClick() {
    const { pokemonId } = this.state;
    console.log(`clicked on #${pokemonId}`);
  }

  componentDidMount() {
    let pokemonId = this.props.content.url;
    pokemonId = pokemonId.split('/').filter(Number)[0]

    this.handleRequest(pokemonId);
  }

  render() {
    const { content } = this.props;
    const { image, generation, pokemonId } = this.state;
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
