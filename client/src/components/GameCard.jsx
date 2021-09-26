import React from "react";
import styles from "./GameCard.module.css";
import { Link } from "react-router-dom";

export default function Card({ name, image, genres, id, rating }) {
  let genero = genres.map((e) => e.name);

  const imgUrl =
    "https://thumbs.dreamstime.com/b/se%C3%B1al-de-ne%C3%B3n-la-m%C3%A1quina-juego-arcada-122983326.jpg";

  return (
    <div className={styles.conteiner}>
      <li className={styles.gameCard}>
        <Link to={"/videogame/" + id}>
          <img
            className={styles.gameImage}
            src={image || imgUrl}
            alt="img not found"
            width="420px"
            height="400px"
          />
        </Link>
        <div className={styles.titleName}>{name}</div>
        <img
          className={styles.line}
          alt="Line"
          src="https://hbomax-images.warnermediacdn.com/2021-09/hero_promo_purpline.png?host=wme-hbomax-drupal-prod.s3.amazonaws.com"
        />
        <div className={styles.genreTitle}>Genres</div>
        <div className={styles.genre}>{genero.join("-")}</div>
        <img
          className={styles.linetwo}
          alt="Line"
          src="https://hbomax-images.warnermediacdn.com/2021-09/hero_promo_purpline.png?host=wme-hbomax-drupal-prod.s3.amazonaws.com"
        />
        <div className={styles.ratingTitle}>Rating</div>
        <div className={styles.rating}>{rating}</div>
      </li>
    </div>
  );
}
