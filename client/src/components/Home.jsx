import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreatedDB,
  getVideoGames,
  orderByName,
  orderByRating,
} from "../actions";
import { Link } from "react-router-dom";
import GameCard from "./GameCard";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch(); //hook
  const allVideoGames = useSelector((state) => state.videoGames); //mapstatetoprops =

  //_____________estados locales
  const [currentPages, setCurrentPages] = useState(1); //pagina actual 1
  const [gamesPerPage, setgamesPerPage] = useState(15); // total por pagina siempre 15
  const [orden, setOrden] = useState("");
  const indexLastGame = currentPages * gamesPerPage; // pagina * personajeporPagina // 15
  const indexFirstGame = indexLastGame - gamesPerPage; //0 indice primer personaje
  const currentGames = allVideoGames.slice(indexFirstGame, indexLastGame); // cual rendenriza depende de la pag!
  // new set no permite copias
  /*   const genres = [
    ...new Set(
      allVideoGames.reduce(
        (acc, curr) => [
          ...acc,
          ...curr.Genres.reduce((acc, curr) => [...acc, curr.name], []),
        ],
        []
      )
    ),
  ].sort((a, b) => (a > b ? 1 : -1)); */

  // probar FLAT

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

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPages(1);
    setOrden(`Ordenado ${e.target.value}`); //!!!!!!!!!!!!!!! usar otro estado
  }

  function handleScore(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPages(1);
    setOrden(`Ordenado ${e.target.value}`); //!!!!!!!!!!!!!!! usar otro estado
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreatedDB(e.target.value));
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
        <select onChange={(e) => handleSort(e)}>
          <option selected="true" disabled="disabled" value="">
            --ORDER--
          </option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>

        <select onChange={(e) => handleScore(e)}>
          <option selected="true" disabled="disabled" value="">
            --RATING--
          </option>
          <option value="top">RATING TOP</option>
          <option value="low">RATING LOW</option>
        </select>

        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="all">All</option>
          <option value="created">Created</option>
          <option value="api">Existent</option>
        </select>

        {/*  <select>
          <option>All</option>
          {genres.map((g) => (
            <option key={g}> {g} </option>
          ))}
        </select> */}
        <Paginado
          gamesTotal={gamesPerPage}
          allVideoGames={allVideoGames.length}
          paginado={paginado}
        />
        {currentGames?.map((g) => {
          // condicion ???

          return (
            <div>
              <Link to={"/home/" + g.id}>
                <GameCard
                  name={g.name}
                  image={g.image}
                  genres={g.genres}
                  key={g.id}
                  rating={g.rating}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
