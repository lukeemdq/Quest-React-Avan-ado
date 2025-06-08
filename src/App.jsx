import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled from "styled-components";
import { AppRoutes } from "./assets/pages/routes";
import "./App.css";
import { HeaderGlobal } from "./assets/components/Header/HeaderGlobal";
import { BrowserRouter } from "react-router-dom";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <HeaderGlobal />
          <AppContainer>
            <AppRoutes />
          </AppContainer>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

const AppContainer = styled.main`
padding: 40px;

`;

export default App;
