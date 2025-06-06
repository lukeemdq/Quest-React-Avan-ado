import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const PostPokemonDetails = () => {
  const { name } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const res = response.data;

      const abilitiesText = await Promise.all(
        res.abilities.map(async (ab) => {
          const abilityRes = await axios.get(ab.ability.url);
          const effectEntry = abilityRes.data.effect_entries.find(
            (entry) => entry.language.name === "en"
          );
          return {
            nameab: ab.ability.name,
            description: effectEntry?.effect || "No description",
          };
        })
      );

      return {
        name: res.name,
        image: res.sprites.front_default,
        moves: res.moves,
        abilities: abilitiesText,
      };
    },
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <>
      <Link to='../'>Home</Link>
      <br />
      <img src={data.image} alt={data.name} />
      <p>{data.name}</p>
      <p>{data.abilities.nameab}</p>
      <ul>
        {data.abilities.map((abilitie) => {
          return (
            <li key={abilitie.nameab}>
              {abilitie.nameab}
              <p>{abilitie.description}</p>
            </li>
          );
        })}
      </ul>

      <ul>
        {data.moves.slice(0, 10).map((move) => {
          return <li key={move.move.name}>{move.move.name}</li>;
        })}
      </ul>
    </>
  );
};

export { PostPokemonDetails };
