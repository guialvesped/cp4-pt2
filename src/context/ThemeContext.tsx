import React, { createContext, ReactNode, useContext, useState } from "react";
import { Appearance } from "react-native";

type ThemeType = "light" | "dark";

interface ThemeColors {
  background: string;
  text: string;
  button: string;
  buttonText: string;
  inputBackground: string;
  inputBorder: string;
}

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState<ThemeType>(colorScheme || "dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const themeColors: Record<ThemeType, ThemeColors> = {
    light: {
      background: "#fff",
      text: "#000",
      button: "#007",
      buttonText: "#575757ff",
      inputBackground: "##f1f3f4",
      inputBorder: "#ccc",
    },
    dark: {
      background: "#121212",
      text: "#fff",
      button: "#59e067",
      buttonText: "#575757ff",
      inputBackground: "#1f1f1f",
      inputBorder: "#333",
    },
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors: themeColors[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
