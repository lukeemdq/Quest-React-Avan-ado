import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

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
        image: res.sprites.other["official-artwork"].front_default,
        moves: res.moves,
        abilities: abilitiesText,
      };
    },
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <ContainerPost>
        <DivPokemon>
          <Link to="../" className="button-back">
            ← Home
          </Link>
          <div className="info-pokemon">
            <div className="circle-mask">
              <img className="pokemon-image" src={data.image} alt={data.name} />
            </div>
            <p className="pokemon-name">{data.name}</p>
          </div>

          <ul className="abilities-infos">
            {data.abilities.map((abilitie) => {
              return (
                <li key={abilitie.nameab}>
                    <p className="abilitie-name">{abilitie.nameab}</p>
                  
                  <p className="abilitie-description">{abilitie.description}</p>
                </li>
              );
            })}
          </ul>

          <ul>
            {data.moves.slice(0, 10).map((move) => {
              return <li key={move.move.name}>{move.move.name}</li>;
            })}
          </ul>
        </DivPokemon>
      </ContainerPost>
    </>
  );
};

const ContainerPost = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DivPokemon = styled.div`
  .circle-mask {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff; /* opcional */
    border: 2px solid #ccc;
    margin-top: 30px;
  }

  .pokemon-image {
    width: 200px;
    height: auto;
    object-fit: contain;
  }

  .button-back {
    font-size: 20px;
    font-weight: 700;
  }

  .info-pokemon {
    display: flex;
    flex-direction: column;
    align-items: center; /* Isso centraliza o conteúdo na horizontal */
  }

  .pokemon-name {
    font-size: 36px;
    font-weight: 700;
    margin-top: 30px;
  }



  .abilities-infos li {
    background-color: #fff;
    margin-top: 15px;
    list-style: none;
    padding: 15px 30px;
    border-radius: 10px;
  }

  .abilitie-name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
    text-transform: capitalize;
  }

  .abilitie-description {
    font-size: 18px;
  }
`;

export { PostPokemonDetails };
