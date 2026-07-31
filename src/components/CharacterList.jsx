import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

// Shape shared by every place a bare character summary is rendered
// (search results and the favourites modal). CharacterDetail.jsx has its
// own, richer shape for the full character record.
const characterSummaryShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
});

// Renders the search results as a list of CharacterItem cards. On mobile,
// selecting a character swaps this list out for the detail panel (see the
// `isShowDetail` / `.show` class pairing in App.css); on wider screens both
// panels are visible side by side.
export default function CharacterList({
  characters,
  isLoding,
  onSelectedCharacter,
  selectedId,
  isShowDetail,
  setIsShowDetail,
}) {
  if (isLoding) {
    return (
      <div className="characters-list" style={{ textAlign: "center" }}>
        <CircularProgress />
        <p className="name">Loading...</p>
      </div>
    );
  }

  return (
    <div className={`characters-list ${!isShowDetail ? "" : "show"}`}>
      {characters.map((item) => {
        const isSelected = selectedId === item.id;
        return (
          <CharacterItem
            key={item.id}
            item={item}
            isExpanded={isSelected}
            selectLabel={isSelected ? `Hide details for ${item.name}` : `View details for ${item.name}`}
            onSelect={() => {
              onSelectedCharacter(item.id);
              // Only open the mobile detail overlay when selecting a
              // character, not when deselecting one.
              if (!isSelected) setIsShowDetail(true);
            }}
          >
            {/* Purely a visual indicator of selection now that the whole
                card is the click/keyboard target — not a separate control. */}
            {isSelected ? (
              <EyeSlashIcon className="icon red" aria-hidden="true" />
            ) : (
              <EyeIcon className="icon red" aria-hidden="true" />
            )}
          </CharacterItem>
        );
      })}
    </div>
  );
}

// ---------  Character Item

// Card layout shared by the search results list and the favourites modal.
// When `onSelect` is provided (search results), the whole card becomes a
// single accessible button — click or keyboard (Enter/Space) triggers it,
// with `selectLabel` as its accessible name. When `onSelect` is omitted
// (favourites modal), the card stays a plain, non-interactive container so
// it doesn't shadow the remove-favourite button rendered as `children`.
export function CharacterItem({ item, children, onSelect, selectLabel, isExpanded }) {
  const interactiveProps = onSelect
    ? {
        role: "button",
        tabIndex: 0,
        "aria-label": selectLabel,
        "aria-expanded": isExpanded,
        onClick: onSelect,
        onKeyDown: (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect();
          }
        },
      }
    : {};

  return (
    <div className="list__item" {...interactiveProps}>
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span aria-hidden="true">{item.gender === "Male" ? "👨 " : "👩 "}</span>
        <span>{item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${item.status === "Dead" ? "red" : ""}`}
          aria-hidden="true"
        ></span>
        <span> {item.status}</span>
        <span> - {item.species}</span>
      </div>
      {children}
    </div>
  );
}

CharacterList.propTypes = {
  characters: PropTypes.arrayOf(characterSummaryShape).isRequired,
  isLoding: PropTypes.bool.isRequired,
  onSelectedCharacter: PropTypes.func.isRequired,
  selectedId: PropTypes.number,
  isShowDetail: PropTypes.bool.isRequired,
  setIsShowDetail: PropTypes.func.isRequired,
};

CharacterItem.propTypes = {
  item: characterSummaryShape.isRequired,
  children: PropTypes.node,
  onSelect: PropTypes.func,
  selectLabel: PropTypes.string,
  isExpanded: PropTypes.bool,
};
