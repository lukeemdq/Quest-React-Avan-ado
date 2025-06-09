import styled from "styled-components";
import pokelogo from "../../images/pokelogo.png";
import { Link } from "react-router-dom";
import { ThemeTogglerButton } from "../Button/theme-toggler-button";


const HeaderGlobal = () => {
  return (
    <>
      <HeaderContainer>
        <Link className="link-home" to="../">
          <div className="container-logo">
            <img src={pokelogo} alt="oi" />
            <p>Pokedex</p>
          </div>
        </Link>
        <div>
          <ThemeTogglerButton/>
        </div>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.header`
  height: 80px;
  background-color: #e3350d;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  font-family: 'Orbitron', sans-serif;

  img {
    width: 50px;
    height: 50px;
  }

  button {
    margin-right: 30px;
    padding: 5px 10px;
    border-radius: 5px;
    font-family: 'Orbitron', sans-serif;
  }

  .container-logo {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 32px;
    font-family: 'Orbitron', sans-serif;
    color: #fff;
  }

  

  .link-home {
    transition: transform 0.3 ease-in-out;
  }

  .link-home:hover {
    transform: scale(1.05);
  }
`;

export { HeaderGlobal };
