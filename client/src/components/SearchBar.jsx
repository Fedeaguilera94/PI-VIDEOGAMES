import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideoGame } from "../actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); // FORM CONTROLADO

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    //console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameVideoGame(name));
    setName("");
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          className={styles.container}
          type="text"
          value={name}
          placeholder="Search Videogame..."
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <button className={styles.btn} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
