import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreatedDB,
  getGenres,
  getVideoGames,
  orderByName,
  orderByRating,
  filterByGenre,
  getPlatforms,
  filterByPlatform,
} from "../actions";
import GameCard from "./GameCard";
import Paginado from "./Paginado";
//import SearchBar from "./SearchBar";
import style from "./Home.module.css";
import NavBar from "./NavBar";
import Spinner from "./Spinner";
export default function Home() {
  const dispatch = useDispatch(); //hook
  const allVideoGames = useSelector((state) => state.videoGames); //mapstatetoprops =

  //_____________estados locales
  const [currentPages, setCurrentPages] = useState(1); //pagina actual 1
  const [gamesPerPage, _setgamesPerPage] = useState(15); // total por pagina siempre 15
  const [_orden, setOrden] = useState("");
  //const [isLoading, setIsLoading] = useState(true);
  //_________________________________
  const indexLastGame = currentPages * gamesPerPage; // pagina * personajeporPagina // 15
  const indexFirstGame = indexLastGame - gamesPerPage; //0 indice primer personaje
  const currentGames = allVideoGames.slice(indexFirstGame, indexLastGame); // cual rendenriza depende de la pag!

  // new set no permite copias

  const paginado = (pageNum) => {
    setCurrentPages(pageNum);
  };

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVideoGames());
  }, [dispatch]); //PONER EL ARREGLO!!!!

  if (!allVideoGames.length) {
    return <Spinner />;
  }

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
    setCurrentPages(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilterGenre(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPages(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilterPlatform(e) {
    e.preventDefault();
    dispatch(filterByPlatform(e.target.value));
    setCurrentPages(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <button
        className={style.btn}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload Games
      </button>
      {/* <div>
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

        <select name="FilterGenre" onChange={(e) => handleFilterGenre(e)}>
          <option selected value="NullSelGenre">
            -Select Genre-
          </option>
          {allGenre.map((genre) => (
            <option key={genre.name} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div> */}
      <div className={style.navBar}>
        <NavBar
          handleSort={handleSort}
          handleScore={handleScore}
          handleFilterCreated={handleFilterCreated}
          handleFilterGenre={handleFilterGenre}
          handleFilterPlatform={handleFilterPlatform}
        />
      </div>

      <ul className={style.gameGrid}>
        {currentGames?.map((g) => {
          // condicion ???

          return (
            <GameCard
              id={g.id}
              name={g.name}
              image={g.image}
              genres={g.genres}
              key={g.id}
              rating={g.rating}
            />
          );
        })}
      </ul>
      <Paginado
        gamesTotal={gamesPerPage}
        allVideoGames={allVideoGames.length}
        paginado={paginado}
      />
    </div>
  );
}
