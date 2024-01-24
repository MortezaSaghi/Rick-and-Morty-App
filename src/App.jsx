import { useState } from "react";
import useFetchCharacters from "./hooks/useFetchCharacters";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";
// -------- import Components
import Navbar from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import ChracterDetail from "./components/ChracterDetail";
import { Toaster} from "react-hot-toast";

function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  //--------------------- SET FAVOURITES ITEM LOCALSTORAGE
  // ----------------------- Custom Hook LocalStorage
  const [favourites, setFavourites] = useLocalStorage("FAVOURITES", []);
  // ---------------------------- Fechting Data
  // --------------------- Custom Hook Fetch api Characters
  const { isLoding, characters } = useFetchCharacters(query);
  const handelChangeQuery = (value) => {
    setQuery(value);
  };

  const handelSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
    // console.log(id);
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
