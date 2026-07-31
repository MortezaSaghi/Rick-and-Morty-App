import CircularProgress from "@mui/material/CircularProgress";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const characterShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  location: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
});

const episodeShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  episode: PropTypes.string.isRequired,
  air_date: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
});

// Fetches and displays the full detail for the currently selected
// character, plus the episodes they appear in. Renders a placeholder when
// nothing is selected yet, and a spinner while the detail/episode requests
// are in flight.
export default function CharacterDetail({
  selectedId,
  handelAddFavourites,
  isFavourite,
  isShowDetail,
  setIsShowDetail,
}) {
  const [character, setCharacter] = useState(null);
  const [isLoding, setIsLoding] = useState(false);
  const [episodes, setepisodes] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoding(true);
        setCharacter(null);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        const episodesId = data.episode.map((item) => item.split("/").at(-1));
        const { data: getEpisodes } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setepisodes([getEpisodes].flat().slice(0, 8));
      } catch (err) {
        toast.error(err.response?.data?.error ?? "Failed to load character details.");
      } finally {
        setIsLoding(false);
      }
    }

    if (selectedId) getData();
  }, [selectedId]);

  if (isLoding)
    return (
      <div style={{ marginLeft: "22%", flex: "1" }}>
        <CircularProgress />
        <div className="name">Loading...</div>
      </div>
    );
  if (!character || !selectedId)
    return (
      <div className="name" style={{ flex: "1" }}>
        Search and select a Character
      </div>
    );

  return (
    <div className={`detail-section ${isShowDetail ? "show" : ""}`}>
      <CharacterInfo
        handelAddFavourites={handelAddFavourites}
        isFavourite={isFavourite}
        character={character}
        setIsShowDetail={setIsShowDetail}
      />
      <CharacterEpisodes episodes={episodes} />
    </div>
  );
}

CharacterDetail.propTypes = {
  selectedId: PropTypes.number,
  handelAddFavourites: PropTypes.func.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  isShowDetail: PropTypes.bool.isRequired,
  setIsShowDetail: PropTypes.func.isRequired,
};

//---------------- Character Info

function CharacterInfo({ handelAddFavourites, isFavourite, character, setIsShowDetail }) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span aria-hidden="true">{character.gender === "Male" ? "👨 " : "👩 "}</span>
          <span>{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
            aria-hidden="true"
          ></span>
          <span>&nbsp;{character.status}</span>
          <span>&nbsp;- {character.species}</span>
        </div>
        <div className="location">
          <p>Last known location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="actions">
          <button
            className={`btn ${isFavourite ? "btn--danger" : "btn--primary"} `}
            onClick={() => handelAddFavourites(character)}
          >
            {!isFavourite ? "Add to Favourite" : "Delete of Favourite"}
          </button>
          {/* Only shown on mobile (hidden ≥760px via CSS) to return to the list */}
          <button
            className="btn-close"
            onClick={() => setIsShowDetail(false)}
            aria-label="Close character detail and return to list"
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
}

CharacterInfo.propTypes = {
  handelAddFavourites: PropTypes.func.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  character: characterShape.isRequired,
  setIsShowDetail: PropTypes.func.isRequired,
};

//---------- character episodes

function CharacterEpisodes({ episodes }) {
  const [sortEarliest, setSortEarliest] = useState(true);
  let sortedEpisodes;

  if (sortEarliest) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episodes:</h2>
        <button
          onClick={() => setSortEarliest((preValue) => !preValue)}
          aria-label={sortEarliest ? "Sort episodes: earliest first (active)" : "Sort episodes: latest first (active)"}
        >
          <ArrowDownCircleIcon
            className="icon"
            aria-hidden="true"
            style={{ rotate: sortEarliest ? "0deg" : "180deg" }}
          />
        </button>
      </div>
      <ul>
        {sortedEpisodes.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, 0)} {item.episode}{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge-date badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

CharacterEpisodes.propTypes = {
  episodes: PropTypes.arrayOf(episodeShape).isRequired,
};
