import axios from "axios";
import { Button } from "../Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchFormPokemon = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const handleChangeSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!search) return;

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );

      navigate(`/pokemon/${search.toLowerCase()}`);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1500); // some depois de 3s
      } else {
        console.error("Erro to Search Pokémon:", err);
      }
    }
  };

  return (
    <>
    { showAlert &&  <AlertBox>Pokémon não encontrado!</AlertBox>}
      <ContainerForm>
        <form onSubmit={handleSubmit} className="form-search">
          <input
            placeholder="Digite o nome do pokémon"
            type="text"
            value={search}
            onChange={handleChangeSearch}
            className="pokemon-search"
          />
          <Button type="submit">Search</Button>
        </form>
      </ContainerForm>
    </>
  );
};

const ContainerForm = styled.div`
  .pokemon-search {
    width: 300px;
    padding: 10px;
    font-size: 16px;
    margin-top: 5px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.buttonBg};
    color: ${(props) => props.theme.text};
  }

  .form-search {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form-search button {
    width: 50%;
    align-self: center;
    padding: 10px;
  }
`;

const AlertBox = styled.div`
  position: fixed;
  top: 200px;
  background-color: #e65757;
  color: white;
  padding: 16px 24px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 999;
  font-weight: bold;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export { SearchFormPokemon };
