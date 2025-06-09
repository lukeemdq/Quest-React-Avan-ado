import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled, { ThemeProvider as StyledThemeProvider } from "styled-components";
import { AppRoutes } from "./assets/pages/routes";
import "./App.css";
import { HeaderGlobal } from "./assets/components/Header/HeaderGlobal";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, ThemeContext } from "./contexts/theme-context";
import { useContext } from "react";



function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledThemeProvider theme={theme}>
      <HeaderGlobal />
      <AppContainer>
        <AppRoutes />
      </AppContainer>
    </StyledThemeProvider>
  );
}


function App() {
  const queryClient = new QueryClient();
  

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider>
            <AppContent/>
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
