import React from "react";
import { useSelector } from "react-redux";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function NavBar({
  handleFilterGenre,
  handleFilterCreated,
  handleScore,
  handleSort,
}) {
  const allGenre = useSelector((state) => state.genres);

  return (
    <div>
      <div className={styles.conteiner}>
        <SearchBar />
      </div>

      {/* ________________________________________ */}
      <div className={styles.conteiner}>
        <div>
          <select
            defaultValue={"DEFAULT"}
            className={styles.selectCont}
            onChange={(e) => handleSort(e)}
          >
            <option
              selected="false"
              disabled="disabled"
              value="DEFAULT"
              name="DEFAULT"
            >
              Order
            </option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
          <select
            className={styles.selectCont}
            defaultValue={"DEFAULT"}
            onChange={(e) => handleScore(e)}
          >
            <option selected="false" disabled="disabled" value="DEFAULT">
              Rating
            </option>
            <option value="top">Rating Top</option>
            <option value="low">Rating Low</option>
          </select>

          <select
            defaultValue={"DEFAULT"}
            className={styles.selectCont}
            onChange={(e) => handleFilterCreated(e)}
          >
            <option selected="false" disabled="disabled" value="DEFAULT">
              Games
            </option>
            <option value="all">All</option>
            <option value="created">Created</option>
            <option value="api">Existent</option>
          </select>

          <select
            defaultValue={"DEFAULT"}
            className={styles.selectCont}
            name="FilterGenre"
            onChange={(e) => handleFilterGenre(e)}
          >
            <option selected="false" disabled="disabled" value="DEFAULT">
              Genres
            </option>
            <option value="all">All</option>

            {allGenre.map((genre) => (
              <option key={genre.name} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
