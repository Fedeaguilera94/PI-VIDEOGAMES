import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideoGame } from "../actions";

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
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="Search Videogame..."
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
