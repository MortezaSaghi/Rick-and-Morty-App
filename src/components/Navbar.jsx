import {
  HeartIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { useState } from "react";
import PropTypes from "prop-types";
import { CharacterItem } from "./CharacterList";

// Top navigation bar: logo, search input (collapses to an icon toggle on
// mobile), theme switcher, and the favourites button that opens the
// favourites modal.
export default function Navbar({
  numOfResult,
  query,
  onQuery,
  favourites,
  onDelete,
  theme,
  onToggleTheme,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const handlerClose = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <Modal title="Favourites" onClose={handlerClose}>
          {favourites.length === 0 && <p className="name">No favourites yet.</p>}
          {favourites.map((item) => (
            <CharacterItem key={item.id} item={item}>
              <button
                aria-label={`Remove ${item.name} from favourites`}
                onClick={() => onDelete(item.id)}
              >
                <TrashIcon className="icon red" aria-hidden="true" />
              </button>
            </CharacterItem>
          ))}
        </Modal>
      )}
      <nav className="navbar">
        <div className="navbar__logo">
          <img src="/Rick_and_Morty.png" alt="Rick and Morty logo" />
        </div>
        <label className="sr-only" htmlFor="character-search">
          Search characters
        </label>
        <input
          id="character-search"
          type="text"
          className={`text-field ${isSearch ? "search" : ""}`}
          placeholder="Search..."
          value={query}
          onChange={(e) => onQuery(e.target.value)}
        />
        <button
          className="icon-btn search-icon"
          aria-label={isSearch ? "Hide search field" : "Show search field"}
          onClick={() => setIsSearch((pre) => !pre)}
        >
          <MagnifyingGlassIcon aria-hidden="true" />
        </button>
        <div className={`navbar__result ${numOfResult ? "active" : ""}`}>
          Found {numOfResult} characters
        </div>
        <button
          className="icon-btn theme-toggle"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          aria-pressed={theme === "dark"}
          onClick={onToggleTheme}
        >
          {theme === "dark" ? (
            <SunIcon className="icon" aria-hidden="true" />
          ) : (
            <MoonIcon className="icon" aria-hidden="true" />
          )}
        </button>
        <button
          className="heart"
          aria-label={`Open favourites (${favourites.length})`}
          onClick={() => setIsOpen(true)}
        >
          <HeartIcon className="icon" aria-hidden="true" />
          <span className="badge" aria-hidden="true">{favourites.length}</span>
        </button>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  numOfResult: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  onQuery: PropTypes.func.isRequired,
  favourites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};
