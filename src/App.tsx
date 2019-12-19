import React from "react";
import "./App.css";
import PokemonSearch from "./components/PokemonSearch";

const App: React.FC = () => {
  return (
    <div className="App">
      <PokemonSearch name="Saqlain Mahmud" numberOfPokemons={1} />
    </div>
  );
};

export default App;
