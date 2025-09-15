import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
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

  const THEME_KEY = "@app_theme";

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (storedTheme === "light" || storedTheme === "dark") {
          setTheme(storedTheme);
        }
      } catch (e) {
        console.error("Erro ao carregar tema:", e);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
    } catch (e) {
      console.error("Erro ao salvar tema:", e);
    }
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
