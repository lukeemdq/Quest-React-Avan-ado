import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/theme-context";
import { Button } from "../Button/Button";

const PostPokemonDetails = () => {
  const { name } = useParams();
  const { theme } = useContext(ThemeContext);

  const [moveList, setMoveList] = useState(10);

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
        types: res.types,
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

            {data.types.map((type) => {
              return (
                <TypeCard
                  type={type.type.name}
                  className="cards-type"
                  key={type.type.name}
                >
                  <li className="pokemon-type">{type.type.name}</li>
                </TypeCard>
              );
            })}
          </div>

          <ul className="abilities-infos">
            <h2>Abilities</h2>
            {data.abilities.map((abilitie) => {
              return (
                <li key={abilitie.nameab}>
                  <p className="abilitie-name">{abilitie.nameab}</p>

                  <p className="abilitie-description">{abilitie.description}</p>
                </li>
              );
            })}
          </ul>
          <h2
            style={{
              marginTop: "35px",
              alignSelf: "center",
              justifySelf: "center",
            }}
          >
            Moves
          </h2>
          <ul className="move-list">
            {data.moves.slice(0, moveList).map((move) => {
              return <li key={move.move.name}>{move.move.name}</li>;
            })}
          </ul>
          <div className="total-moves">
            <p>
              {" "}
              Showing {Math.min(moveList, data.moves.length)} of {data.moves.length}
            </p>
            {moveList < data.moves.length && (
              <button className="button-more" onClick={() => setMoveList((prev) => prev + 10)}>
                Carregar mais
              </button>
            )}
          </div>
        </DivPokemon>
      </ContainerPost>
    </>
  );
};

const ContainerPost = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.text};
`;

const DivPokemon = styled.div`
  .circle-mask {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.buttonBg};
    border: 2px solid #aaa;
    margin-top: 30px;
  }

  .pokemon-image {
    width: 200px;
    height: auto;
    object-fit: contain;
  }

  .button-more {
    padding: 10px 30px;
    background-color: #e65757;
    color: #fff;
    border-radius: 10px;
    border: 1px solid #000;
  }

  .button-back {
    font-size: 20px;
    font-weight: 700;
    color: ${(props) => props.theme.text};
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
    text-transform: capitalize;
  }

  .abilities-infos li {
    background-color: ${(props) => props.theme.buttonBg};
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

  .move-list {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 40px;
  }

  .move-list li {
    background-color: ${(props) => props.theme.buttonBg};
    margin-right: 15px;
    margin-bottom: 15px;
    width: 200px;
    text-align: center;
    padding: 10px;
    text-transform: capitalize;
    font-weight: 700;
  }

  .total-moves {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    flex-direction: column;
    gap: 15px;
  }
`;

const TypeCard = styled.div`
  background-color: ${({ type }) => typeColors[type] || "#ccc"};
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: bold;
  text-transform: capitalize;
  width: 100px;
  text-align: center;

  margin-top: 10px;

  .cards-type {
  }

  .pokemon-type {
    list-style: none;
  }
`;

const typeColors = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
};

export { PostPokemonDetails };
