import { useEffect, useState } from "react";
import axios from "axios";
// import {allCharacters} from "./../public/data/data"
import "./App.css";
// -------- import Components
import Navbar from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import ChracterDetail from "./components/ChracterDetail";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourates] = useState(
    () => JSON.parse(localStorage.getItem("FAVOURITES")) || []
  );

  const handelChangeQuery = (value) => {
    setQuery(value);
  };

  const handelSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
    // console.log(id);
  };

  const isFavourite = favourites.map((fav) => fav.id).includes(selectedId);

  const handelDeleteFavourite = (id) => {
    setFavourates((preFavourites) =>
      preFavourites.filter((item) => item.id !== id)
    );
  };

  const handelAddFavourites = (char) => {
    if (!isFavourite) {
      setFavourates((preFav) => [...preFav, char]);
    } else {
      setFavourates((preFavourites) =>
        preFavourites.filter((fav) => fav.id !== selectedId)
      );
    }
  };

  //------------- SET FAVOURITES ITEM LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("FAVOURITES", JSON.stringify(favourites));
  }, [favourites]);

  //---------- Fechting Data
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

  return (
    <div className="app">
      <Toaster />

      <Navbar
        numOfResult={characters.length}
        query={query}
        onQuery={handelChangeQuery}
        favourites={favourites}
        onDelete={handelDeleteFavourite}
      />
      <div className="main">
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoding={isLoding}
          onSelectedCharacter={handelSelectCharacter}
        />
        <ChracterDetail
          selectedId={selectedId}
          handelAddFavourites={handelAddFavourites}
          isFavourite={isFavourite}
        />
      </div>
    </div>
  );
}

export default App;
