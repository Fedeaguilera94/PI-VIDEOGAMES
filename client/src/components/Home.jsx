import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideoGames } from "../actions";
import { Link } from "react-router-dom";
import GameCard from "./GameCard";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch(); //hook
  const allVideoGames = useSelector((state) => state.videoGames); //mapstatetoprops =
  //_____________estados locales
  const [currentPages, setCurrentPages] = useState(1); //pagina actual 1
  const [gamesPerPage, setgamesPerPage] = useState(15); // total por pagina siempre 15
  const indexLastGame = currentPages * gamesPerPage; // pagina * personajeporPagina // 15
  const indexFirstGame = indexLastGame - gamesPerPage; //0 indice primer personaje
  const currentGames = allVideoGames.slice(indexFirstGame, indexLastGame); // cual rendenriza depende de la pag!

  const paginado = (pageNum) => {
    setCurrentPages(pageNum);
  };

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
        <Paginado
          gamesTotal={gamesPerPage}
          allVideoGames={allVideoGames.length}
          paginado={paginado}
        />
        {currentGames?.map((g) => {
          // condicion ???

          return (
            <div>
              <GameCard
                name={g.name}
                image={g.image}
                genre={g.Genres}
                key={g.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
