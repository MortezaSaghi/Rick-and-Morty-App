import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useFetchCharacters(query) {
  const [characters, setCharacters] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function getData() {
      try {
        setIsLoding(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );
        setCharacters(data.results.slice(0, 6));
      } catch (err) {
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(err.response.data.error);
        }
      } finally {
        setIsLoding(false);
      }
    }
    if (query.length < 3) {
      setCharacters([]);
      return;
    }
    getData();
    // ---- clean up fetch api  (re-redder => searchbox)
    return () => {
      controller.abort();
    };
  }, [query]);
  return { isLoding, characters };
}
