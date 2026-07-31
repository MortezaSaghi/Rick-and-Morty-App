import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const STORAGE_KEY = "THEME";

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Manages the light/dark theme. On first visit (nothing in localStorage
// yet) it follows the OS preference; once the user toggles it explicitly,
// that choice is persisted and wins over the OS setting from then on.
// The active theme is exposed to CSS via a `data-theme` attribute on
// <html>, which index.css switches its custom properties on.
export default function useTheme() {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEY, getSystemTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}
