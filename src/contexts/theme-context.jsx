import { createContext, useState } from "react";

const themes = {
  light: {
    background: "#f9f9f9",
    text: "#333",
    buttonBg: "#ddd",
  },
  dark: {
    background: "#121212",
    text: "#f9f9f9",
    buttonBg: "#333",
  },
};

const ThemeContext = createContext({});

const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(themes.dark);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, themes, ThemeProvider };
