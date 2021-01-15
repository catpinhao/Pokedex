import React from 'react';
import './PokedexList.scss';
import Pokemon from './Pokemon';
import PokemonModal from './PokemonModal';

export default class PokedexList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      pokedex: [],
      selectedPokemonId: -1,
      selectedPokemonContent: [],
      showModal: false
    };

    this.handleRequest = this.handleRequest.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleRequest() {
    const { offset, pokedex } = this.state;
    const self = this;

    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`)
      .then(res => res.json())
      .then((res) =>
        self.setState({
          offset: offset + 20,
          pokedex: [...pokedex, ...res.results],
        })
      );
  }

  handleModal(pokemonId, pokemon) {
    this.setState({
      selectedPokemonId: pokemonId,
      selectedPokemonContent: pokemon,
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      selectedPokemonId: -1,
      selectedPokemonContent: [],
      showModal: false,
    });
  }

  componentDidMount() {
    this.handleRequest();
  }

  render() {
    const { pokedex, selectedPokemonContent, selectedPokemonId, showModal } = this.state;
    const pokemon = pokedex.map(entry => {
      const pokemonId = entry.url.split('/').filter(Number)[0];
      return (
        <Pokemon pokemonId={pokemonId} content={entry} key={pokemonId} handleModal={this.handleModal} />
      )
    });

    return (
      <section className="pokedex_wrapper">
        <div className="pokedex_list">
          {pokemon}
        </div>
        <PokemonModal show={showModal} closeModal={this.closeModal} pokemonId={selectedPokemonId} pokemon={selectedPokemonContent} />
        <button className="pokedex_button" onClick={this.handleRequest}>More</button>
      </section>
    );
  }
}
