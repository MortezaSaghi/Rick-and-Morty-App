import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// How long to wait after the user stops typing before firing a request.
// Lets suggestions start from the very first character without sending a
// request per keystroke — only once typing pauses.
const DEBOUNCE_MS = 300;

// Fetches characters matching `query` from the Rick and Morty API.
// Two things keep this cheap even though results now start at 1 character
// instead of 3: requests are debounced (see DEBOUNCE_MS above), and every
// successful response is cached in-memory per exact query string for the
// life of this hook instance, so retyping or backspacing to a query already
// seen this session resolves instantly with no network call.
export default function useFetchCharacters(query) {
  const [characters, setCharacters] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const cacheRef = useRef(new Map());

  useEffect(() => {
    if (query.length === 0) {
      setIsLoding(false);
      setCharacters([]);
      return;
    }

    const cached = cacheRef.current.get(query);
    if (cached) {
      setIsLoding(false);
      setCharacters(cached);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        setIsLoding(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal: controller.signal }
        );
        const results = data.results.slice(0, 6);
        cacheRef.current.set(query, results);
        setCharacters(results);
      } catch (err) {
        // Aborted requests (superseded by a newer keystroke) are expected
        // and must not surface as errors.
        if (!axios.isCancel(err)) {
          setCharacters([]);
          toast.error(err.response?.data?.error ?? "Something went wrong while searching.");
        }
      } finally {
        setIsLoding(false);
      }
    }, DEBOUNCE_MS);

    // Cancel the pending/in-flight request when the query changes again
    // before it fires or resolves, or on unmount.
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return { isLoding, characters };
}