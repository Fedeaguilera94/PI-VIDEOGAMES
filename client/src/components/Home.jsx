import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideoGames } from "../actions";
import { Link } from "react-router-dom";
import GameCard from "./GameCard";

export default function Home() {
  const dispatch = useDispatch(); //hook
  const allVideoGames = useSelector((state) => state.videoGames); //mapstatetoprops =

  useEffect(() => {
    dispatch(getVideoGames());
  }, [dispatch]); //PONER EL ARREGLO!!!!

  function handleClick(e) {
    e.preventDefault(); //!!!! PONER
    dispatch(getVideoGames());
  }

  return (
    <div>
      <Link to="/videogame">Created Video Game</Link>
      <h1>VideoGame</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload Games
      </button>
      <div>
        <select>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
          <option value="rat">RATING</option>
        </select>
        <select>
          <option value="genre">Genre</option>
          <option value="create">Create in BD</option>
        </select>
        {allVideoGames?.map((g) => {
          // condicion ???

          return (
            <div>
              <GameCard name={g.name} image={g.image} genre={g.Genres} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
