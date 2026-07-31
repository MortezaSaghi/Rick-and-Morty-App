import { useEffect, useState } from "react";

// Persists a piece of state to localStorage under `key`, syncing on every
// change. Used for both the favourites list and the theme preference so
// they survive page reloads.
export default function useLocalStorage(key, initialState) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}