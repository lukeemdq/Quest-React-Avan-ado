import { render, screen } from "@testing-library/react";
import { PokedexPost } from "../PokedexPost";
import * as api from "../../services/fetchPokedex";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("../../services/fetchPokedex");

const mockData = [
  {
    name: "pikachu",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  },
  {
    name: "bulbasaur",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
];

const renderWithProviders = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PokedexPost />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

test("renderiza os pokémons na tela", async () => {
  api.fetchPokedex.mockResolvedValue(mockData);

  renderWithProviders();

  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
  expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
});
