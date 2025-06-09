import { fetchPokedex } from "../../Hooks/usePokedex";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SearchFormPokemon } from "../SearchForm/SearchFormPokemon";



const PokedexPost = () => {
  const [limit, setLimit] = useState(10);
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon", limit],
    queryFn: fetchPokedex,
  });

  const isFirstLoad = useRef(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [data]);

  if (isLoading)
    return (
      <LoadingWrapper>
        {" "}
        <LoadingMessage
          style={{ alignSelf: "center", justifyContent: "center" }}
        >
          Carregando pokemons...
        </LoadingMessage>
      </LoadingWrapper>
    );
  if (error) return <p> {error.message}</p>;
  
  return (
    <>
      <MainContainer>
        <h1 className="title-pokedex">
          Now you can find details of yours favorites pokémons!
        </h1>
        <SearchFormPokemon/>

        <ul className="container-list">
          {data.map((pokemon, index) => {
            return (
              <li className="card-pokemon" key={pokemon.name}>
                <Link
                  className="card-pokemon-link"
                  to={`/pokemon/${pokemon.name}`}
                >
                  <span>#{index}</span>

                  <img
                    className="image-pokemon"
                    src={pokemon.image}
                    alt={pokemon.name}
                  />
                  <p className="pokemon-name"> {pokemon.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>

        <div ref={bottomRef} />
        <button
          className="button-more"
          onClick={() => setLimit((more) => more + 10)}
        >
          Carregar mais
        </button>
      </MainContainer>
    </>
  );
};

const LoadingMessage = styled.p`
  align-self: center;
  justify-content: center;
  color: ${(props) => props.theme.text};
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; 
`;

const MainContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.text};
  margin-top: 30px;

  .title-pokedex {
    font-size: 32px;
    margin-bottom: 10px;
  }

  

  .container-list {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    align-items: center;
    justify-content: center;
    padding: 30px;
    max-width: 1300px;
  }

  .card-pokemon {
    background-color: ${(props) => props.theme.buttonBg};
    list-style: none;
    font-weight: bold;
    font-size: 20px;
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: transform 0.3 ease-in-out;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
  }

  .card-pokemon:hover {
    transform: scale(1.05);
  }

  .pokemon-name {
    margin: 0px;
    text-transform: capitalize;
    color: ${(props) => props.theme.text};
  }

  span {
    display: block;
    color: ${(props) => props.theme.text};
    font-size: 12px;
    margin-bottom: 5px;
  }

  .image-pokemon {
    margin-top: auto;
    margin-bottom: auto;
    width: 120px;
    height: auto;
  }

  .button-more {
    padding: 10px 30px;
    background-color: #e65757;
    color: #fff;
    border-radius: 10px;
    border: 1px solid #000;
  }
`;

export { PokedexPost };
