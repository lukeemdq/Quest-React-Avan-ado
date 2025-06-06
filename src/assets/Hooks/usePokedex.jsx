import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"





const fetchPokedex = async ({queryKey}) => {
    const [_key, limit] = queryKey;
    
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const pokemons = response.data.results;

    // Faz várias requisições em paralelo
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

// const usePokedex = () => {
//     return useQuery({
//         queryKey: ['pokemon', limit],
//         queryFn: fetchPokedex,
//         keepPreviousData: true
//     })
// }

export { fetchPokedex}