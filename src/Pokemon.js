import React from 'react';
import './Pokemon.css';

export default class Pokemon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: [],
      image: ''
    };

    this.handleRequest = this.handleRequest.bind(this);
  }

  handleRequest() {
    const { name } = this.props.content;
    const self = this;

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then((res) =>
        self.setState({
          pokemon: res,
          image: res.sprites.front_default
        })
      );
  }

  componentDidMount() {
    this.handleRequest();
  }

  render() {
    const { content } = this.props;
    const { image } = this.state;

    return (
      <div className="pokedex_card">
        {content.name}
        <img src={image} alt={content.name} />
      </div>
    );
  }
}
