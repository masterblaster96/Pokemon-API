import { useEffect, useState } from "react";
import "./styles.css";
import { getPokemonList, getPokemonDescription } from "./utils.js";

export default function App() {
  const [list, setPokemonList] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(1);
  const [description, setDescription] = useState(1);

  function handleSelect(e) {
    setSelectedPokemon(e.target.value);
  }

  console.log(selectedPokemon);

  useEffect(() => {

    async function getList() {
      try {
        const list = await getPokemonList();
        setPokemonList(list);


        const description = await getPokemonDescription(selectedPokemon);

        setDescription(description);

      } catch (e) {
        console.log(e);
      }
    }
    getList();
  }, [selectedPokemon]);



  function togglePokemon(id) {


    console.log(id);

    if (id === 0) setSelectedPokemon(Number(selectedPokemon) - 1);


    if (id === 1) setSelectedPokemon(Number(selectedPokemon) + 1);
  }

  return (
    <div className="App">
      <select onChange={handleSelect} value={selectedPokemon}>
        {list?.map((pokemon, index) => (
          <option key={index + 1} value={index + 1}>
            {pokemon.name}
          </option>
        ))}
      </select>
       <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${selectedPokemon}.png`}
        alt="pokemon"
        style={{ width: 200, height: 200 }}
      />

      <p>{description}</p>
      <button disabled={selectedPokemon === 1} onClick={() => togglePokemon(0)}>
        Prev
      </button>

      <button
        disabled={selectedPokemon === list?.length - 1}
        onClick={() => togglePokemon(1)}
      >
        Next
      </button>
    </div>
  );
}
