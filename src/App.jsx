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
  const [selectedId,setSelectedId]=useState(null)

  const handelChangeQuery = (value) => {
    setQuery(value);
  };

  const handelSelectCharacter=(id)=>{
    setSelectedId(prevId=>prevId===id?null:id)
    // console.log(id);
  }

  //---------- Fechting Data
  useEffect(() => {
    async function getData() {
      try {
        setIsLoding(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        setCharacters(data.results);
      } catch (err) {
        setCharacters([]);
        toast.error(err.response.data.error);
      } finally {
        setIsLoding(false);
      }
    }
    if (query.length < 3) {
      setCharacters([]);
      return;
    }
    getData();
  }, [query]);

  return (
    <div className="app">
      <Toaster />
      <Navbar
        numOfResult={characters.length}
        query={query}
        onQuery={handelChangeQuery}
      />
      <div className="main">
        <CharacterList selectedId={selectedId} characters={characters} isLoding={isLoding} onSelectedCharacter={handelSelectCharacter} />
        <ChracterDetail selectedId={selectedId} />
      </div>
    </div>
  );
}

export default App;
