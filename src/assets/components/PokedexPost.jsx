import { fetchPokedex } from "../Hooks/usePokedex";
import { useState, useEffect, useRef } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const PokedexPost = () => {
  const [limit, setLimit] = useState(10);
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon", limit],
    queryFn: fetchPokedex,
  });

  const isFirstLoad = useRef(true)
  const bottomRef = useRef(null);

  useEffect(() => {
    if(isFirstLoad.current) {
        isFirstLoad.current = false;
        return
    }
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: 'start' });
    }
  }, [data]);

  if (isLoading) return <p>Carregando pokemons...</p>;
  if (error) return <p> {error.message}</p>;

  return (
    <>
      <div style={{overflow: 'auto', }}>
        <ul>
          {data.map((pokemon) => {
            return (
              <li key={pokemon.name}>
                <p>{pokemon.name}</p>
                <img src={pokemon.image} alt={pokemon.name} />
              </li>
            );
          })}
        </ul>

        <div ref={bottomRef} />
        <button onClick={() => setLimit((more) => more + 10)}>
          Carregar mais
        </button>
      </div>
    </>
  );
};

export { PokedexPost };
