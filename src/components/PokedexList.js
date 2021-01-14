import React from 'react';
import './PokedexList.scss';
import Pokemon from './Pokemon';

export default class PokedexList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      pokedex: []
    };

    this.handleRequest = this.handleRequest.bind(this);
  }

  handleRequest() {
    // TODO: replace button with a spinning placeholder
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

  componentDidMount() {
    this.handleRequest();
  }

  render() {
    const { pokedex } = this.state;
    const pokemon = pokedex.map(entry => (
      <Pokemon content={entry} key={entry.name} />
    ));

    return (
      <section className="pokedex_wrapper">
        <div className="pokedex_list">
          {pokemon}
        </div>
        <button className="pokedex_button" onClick={this.handleRequest}>More</button>
      </section>
    );
  }
}
