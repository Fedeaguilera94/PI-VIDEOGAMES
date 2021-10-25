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
} from "../actions";
import GameCard from "./GameCard";
import Paginado from "./Paginado";
//import SearchBar from "./SearchBar";
import styles from "./Home.module.css";
import NavBar from "./NavBar";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { BiJoystickButton } from "react-icons/bi";
export default function Home() {
  const dispatch = useDispatch(); //hook
  const allVideoGames = useSelector((state) => state.videoGames); //mapstatetoprops =
  const videogameState = useSelector((state) => state.allVideoGames);

  //_____________estados locales
  const [currentPages, setCurrentPages] = useState(1); //pagina actual 1
  const [gamesPerPage, _setgamesPerPage] = useState(15); // total por pagina siempre 15
  const [_orden, setOrden] = useState("");

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

  if (!allVideoGames.length && !videogameState.length) {
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
    setOrden(e.target.value); //!!!!!!!!!!!!!!! usar otro estado
  }

  function handleScore(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPages(1);
    setOrden(e.target.value); //!!!!!!!!!!!!!!! usar otro estado
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreatedDB(e.target.value));
    setCurrentPages(1);
    setOrden(e.target.value);
  }

  function handleFilterGenre(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    setCurrentPages(1);
    setOrden(e.target.value);
  }

  return (
    <div>
      <div className={styles.btnhome}>
        <Link className={styles.link} to="/creategame">
          <BiJoystickButton /> Create videogame
        </Link>
      </div>
      <div className={styles.line}>
        <img
          className={styles.linelink}
          alt="Line"
          src="https://hbomax-images.warnermediacdn.com/2021-09/hero_promo_purpline.png?host=wme-hbomax-drupal-prod.s3.amazonaws.com"
        />
      </div>
      <div className={styles.btnreload}>
        <button
          className={styles.btn30}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Reload Games
        </button>
      </div>
      <div>
        <NavBar
          handleSort={handleSort}
          handleScore={handleScore}
          handleFilterCreated={handleFilterCreated}
          handleFilterGenre={handleFilterGenre}
        />
      </div>

      <ul className={styles.gameGrid}>
        {currentGames?.map((g) => {
          // condicion ?

          return (
            <GameCard
              id={g.id}
              name={g.name}
              image={g.image}
              genres={g.genres}
              key={g.id}
              rating={g.rating}
              platforms={g.platforms}
            />
          );
        })}
      </ul>
      <div style={{ marginBottom: "2rem" }}>
        <Paginado
          gamesTotal={gamesPerPage}
          allVideoGames={allVideoGames.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
