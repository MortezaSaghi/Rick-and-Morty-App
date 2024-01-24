import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialState) {
  const [Value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialState
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(Value));
  }, [Value]);

  return [Value, setValue];
}
