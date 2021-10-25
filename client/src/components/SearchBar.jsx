import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideoGame } from "../actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); // ESTADO LOCAL

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.length) {
      alert("Please Writing a VideoGame");
    } else {
      dispatch(getNameVideoGame(name)); // VA AL ESTADO GLOBAL
      setName("");
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={styles.conteiner}>
          <input
            className={styles.searchbar}
            type="text"
            value={name}
            placeholder="     Search Videogame..."
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <button className={styles.bn30} type="submit">
            Search
          </button>
        </div>
      </form>
    </>
  );
}
