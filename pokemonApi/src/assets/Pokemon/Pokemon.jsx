import { useEffect, useState } from "react";

function ListaPokemon() {
    const [pokemons, setPokemons] = useState([]);
    async function loadPokemons() {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const data = await response.json()
        setPokemons(data.results)
    }

    useEffect(() => {
        loadPokemons();
    }, [])

    return (
        <div className="pokemon-container">
            {pokemons.map((pokemon, index) => (
                <div key={index} className="pokemon-card">
                    <h3>{pokemon.name}</h3>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                        alt={pokemon.name}
                    />
                </div>
            ))}
        </div>
    )
}

export default ListaPokemon;