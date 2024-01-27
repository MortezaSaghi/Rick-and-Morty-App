import { HeartIcon, MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { useState } from "react";
import { CharacterItem } from "./CharacterList";

export default function Navbar({ numOfResult, query, onQuery, favourites , onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch,setIsSearch] = useState(false)
  const handlerClose = () => setIsOpen(false);
  return (
    <>
      {isOpen && (
        <Modal title="Favourites" open={isOpen} onClose={handlerClose}>
          {favourites.map((item) => (
            <CharacterItem key={item.id} item={item}>
              <TrashIcon className="icon red" onClick={()=>onDelete(item.id)}/>
            </CharacterItem>
          ))}
        </Modal>
      )}
      <nav className="navbar">
        <div className="navbar__logo">
          <img src="./../../public/Rick_and_Morty.png" alt="" />
        </div>
        <MagnifyingGlassIcon className="search-icon" onClick={()=>setIsSearch(pre=>!pre)}/>
        <input
          type="text"
          className={`text-field ${isSearch?"search":""}`}
          placeholder="Search..."
          value={query}
          onChange={(e) => onQuery(e.target.value)}
        />
        <div className={`navbar__result ${numOfResult?"active":""}`}>Found {numOfResult} characters</div>
        <button className="heart">
          <HeartIcon className="icon" onClick={() => setIsOpen(true)} />
          <span className="badge">{favourites.length}</span>
        </button>
      </nav>
    </>
  );
}
