# Pokédex React ⚡️

Um projeto feito em React que consome a PokéAPI para exibir detalhes dos seus Pokémons favoritos!

## 🔍 Funcionalidades

- Buscar pokémon pelo nome
- Alternar tema (claro/escuro)
- Scroll automático ao carregar mais
- Estilo com styled-components
- Responsivo e com design simples e responsivo 

## 🚀 Tecnologias usadas

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [React Query](https://tanstack.com/query/v4/)
- [Styled Components](https://styled-components.com/)
- [PokéAPI](https://pokeapi.co/)



## Decisões
    Tomei a decisão do uso do axios com react query pois senti que com o query me facilitaria 
    nos usos de atualização do fetch em vez de precisar ficar usando useEffects, pensei em utilizar
    alguma blibioteca para fazer o alter mas preferi usar com styled-components mesmo para testar como
    poderia ser feito.

## 🧪 Como rodar o projeto

```bash
# Clone o repositório
git clone https://github.com/lukeemdq/pokedex-react.git

# Entre na pasta
cd pokedex-react

# Instale as dependências
npm install

# Rode o projeto
npm run dev
