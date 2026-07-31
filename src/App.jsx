import { useState } from "react";
import useFetchCharacters from "./hooks/useFetchCharacters";
import useLocalStorage from "./hooks/useLocalStorage";
import useTheme from "./hooks/useTheme";
import "./App.css";
// -------- import Components
import Navbar from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { Toaster } from "react-hot-toast";

// Root component. Owns the search query, selected character, favourites
// list, and theme — all local state, no external state library. Data for
// the list/detail panels comes from the two custom hooks in src/hooks.
function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isShowDetail, setIsShowDetail] = useState(false);
  //--------------------- SET FAVOURITES ITEM LOCALSTORAGE
  // ----------------------- Custom Hook LocalStorage
  const [favourites, setFavourites] = useLocalStorage("FAVOURITES", []);
  // ---------------------------- Fechting Data
  // --------------------- Custom Hook Fetch api Characters
  const { isLoding, characters } = useFetchCharacters(query);
  const { theme, toggleTheme } = useTheme();

  const handelChangeQuery = (value) => {
    setQuery(value);
  };

  const handelSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const isFavourite = favourites.map((fav) => fav.id).includes(selectedId);

  const handelDeleteFavourite = (id) => {
    setFavourites((preFavourites) =>
      preFavourites.filter((item) => item.id !== id)
    );
  };

  const handelAddFavourites = (char) => {
    if (!isFavourite) {
      setFavourites((preFav) => [...preFav, char]);
    } else {
      setFavourites((preFavourites) =>
        preFavourites.filter((fav) => fav.id !== selectedId)
      );
    }
  };

  return (
    <div className="app">
      <Toaster />

      <Navbar
        numOfResult={characters.length}
        query={query}
        onQuery={handelChangeQuery}
        favourites={favourites}
        onDelete={handelDeleteFavourite}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <div className="main">
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoding={isLoding}
          isShowDetail={isShowDetail}
          setIsShowDetail={setIsShowDetail}
          onSelectedCharacter={handelSelectCharacter}
        />
        <CharacterDetail
          selectedId={selectedId}
          isShowDetail={isShowDetail}
          setIsShowDetail={setIsShowDetail}
          handelAddFavourites={handelAddFavourites}
          isFavourite={isFavourite}
        />
      </div>
    </div>
  );
}

export default App;
