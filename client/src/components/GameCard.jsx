import React from "react";
import styles from "./GameCard.module.css";
import { Link } from "react-router-dom";

export default function Card({ name, image, genres, id, rating, platforms }) {
  let genero = genres.map((e) => e.name);
  let plataforma = platforms.map((p) => p.name);
  const imgUrl =
    "https://thumbs.dreamstime.com/b/se%C3%B1al-de-ne%C3%B3n-la-m%C3%A1quina-juego-arcada-122983326.jpg";

  return (
    <li className={styles.gameCard}>
      <Link to={"/videogame/" + id}>
        <img
          className={styles.gameImage}
          src={image || imgUrl}
          alt="img not found"
          width="220px"
          height="200px"
        />
      </Link>
      <div className={styles.titleName}>{name}</div>
      <div className={styles.genreName}>Genres : {genero.join("-")}</div>
      <div className={styles.ratingName}>Rating : {rating}</div>
    </li>
  );
}
