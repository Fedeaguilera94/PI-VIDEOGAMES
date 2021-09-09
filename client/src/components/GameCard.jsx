import React from "react";
import styles from "./GameCard.module.css";

export default function Card({ name, image, genres, id, rating }) {
  let genero = genres.map((e) => e.name);

  return (
    <li className={styles.gameCard}>
      <div className={styles.titleName}>{name}</div>
      <img
        className={styles.gameImage}
        src={image || "https://myvideogamelist.com/assets/images/default.png"}
        alt="img not found"
        width="220px"
        height="200px"
      />
      <div className={styles.genreName}>Genres : {genero.join("-")}</div>
      <div className={styles.ratingName}>Rating : {rating}</div>
    </li>
  );
}
