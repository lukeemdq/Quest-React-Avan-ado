import { usePokedex } from "../Hooks/usePokedex";


const PokedexPost = () => {
  const { data, isLoading, error } = usePokedex();

  if (isLoading) return <p>Carregando pokemons...</p>;
  if (error) return <p> {error.message}</p>;
    
  return (
    <>
      <ul>
        {data.map((pokemon) => {
            console.log(pokemon)
          return (
                 
            <li key={pokemon.name}>
                <p>{pokemon.name}</p>
                <img  src={pokemon.image} alt={pokemon.name} />
            </li>
            
            
        )
          
        })}
      </ul>
    </>
  );
};

export { PokedexPost };

