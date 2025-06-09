import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled from "styled-components";
import { AppRoutes } from "./assets/pages/routes";
import "./App.css";
import { HeaderGlobal } from "./assets/components/Header/HeaderGlobal";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";




function App() {
  const queryClient = new QueryClient();
  

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider>
            <HeaderGlobal />
            <AppContainer>
              <AppRoutes />
            </AppContainer>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

const AppContainer = styled.main`
  padding: 40px;
  background-color: ${(props) => props.theme.background};
  min-height: 100vh;

 
`;

export default App;
