import axios from "axios"


const fetchPokedex = async ({queryKey}) => {
    const [_key, limit] = queryKey;
    
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const pokemons = response.data.results;

    const detailed = await Promise.all(
        pokemons.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return {
                name: pokemon.name,
                image: res.data.sprites.front_default,
                
            };
        })
    );

    return detailed;
};



export { fetchPokedex}