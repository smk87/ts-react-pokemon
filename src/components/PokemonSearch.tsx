import React, { Component } from "react";
import User from "../interfaces/User.interface";
import Pokemon from "../interfaces/Pokemon.interface";

// interface for PokemonSearch's state
interface SearchState {
  error: boolean;
  pokemon: Pokemon;
}

// Set Incoming prop interface and state interface by <User, SearchState>
class PokemonSearch extends Component<User, SearchState> {
  pokemonRef: React.RefObject<HTMLInputElement>;

  constructor(props: User) {
    super(props);
    this.pokemonRef = React.createRef();

    this.state = {
      pokemon: null,
      error: false
    };
  }

  onSearchClick = () => {
    const inputValue = this.pokemonRef.current.value;

    // API call
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}/`).then(res => {
      if (res.status !== 200) {
        this.setState({ error: true });
        return;
      }
      res.json().then(data => {
        this.setState({
          error: false,
          pokemon: {
            name: data.name,
            numberOfAbilities: data.abilities.length,
            baseExperience: data.base_experience,
            imageUrl: data.sprites.front_default
          }
        });
      });
    });
  };

  render() {
    const { name: userName, numberOfPokemons } = this.props;
    const { error, pokemon } = this.state;

    // Set to JSX Element type
    let resultMarkUp: JSX.Element;

    if (error) {
      resultMarkUp = <p>Pokemon not found, please try again.</p>;
    } else if (pokemon) {
      resultMarkUp = (
        <div>
          <img src={pokemon.imageUrl} alt="pokemon" className="pokemon-image" />
          <p>
            {pokemon.name} has {pokemon.numberOfAbilities} abilities and{" "}
            {pokemon.baseExperience} base experience points
          </p>
        </div>
      );
    }

    return (
      <div>
        <p>
          User {userName} has {numberOfPokemons || "0"} pokemons
        </p>
        <input type="text" ref={this.pokemonRef} />
        <button onClick={this.onSearchClick} className="my-button">
          Search
        </button>
        {resultMarkUp}
      </div>
    );
  }
}

export default PokemonSearch;
