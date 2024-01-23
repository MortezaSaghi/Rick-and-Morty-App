import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import CircularProgress from "@mui/material/CircularProgress";
import { Children } from "react";

export default function CharacterList({
  characters,
  isLoding,
  onSelectedCharacter,
  selectedId,
}) {
  // console.log(characters);
  if (isLoding) {
    return (
      <div className="characters-list" style={{ textAlign: "center" }}>
        <CircularProgress />
        <p className="name">Loding...</p>
      </div>
    );
  }
  return (
    <div className="characters-list">
      {characters.map((item) => (
        <CharacterItem
          key={item.id}
          selectedId={selectedId}
          item={item}
          onSelectedCharacter={onSelectedCharacter}
        >
          <button
            className="icon red"
            onClick={() => onSelectedCharacter(item.id)}
          >
            {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </CharacterItem>
      ))}
    </div>
  );
}

// ---------  Character Item

export function CharacterItem({
  item,
  
  children,
}) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender === "Male" ? "👨 " : "👩 "}</span>
        <span>{item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${item.status === "Dead" ? "red" : ""}`}
        ></span>
        <span> {item.status}</span>
        <span> - {item.species}</span>
      </div>
      {children}
    </div>
  );
}
