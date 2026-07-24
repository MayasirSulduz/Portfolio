import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "dark-theme");
    return "dark-theme";
  }
  return theme;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheme());

  const toggleTheme = () => {
    let newTheme = "dark-theme";
    if (theme === "dark-theme") {
      newTheme = "cyber-theme";
    } else if (theme === "cyber-theme") {
      newTheme = "light-theme";
    } else {
      newTheme = "dark-theme";
    }

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.classList.remove("dark-theme", "light-theme", "cyber-theme");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
