import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import styles from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getDetail(id));
  }, [id, dispatch]);
  const detail = useSelector((state) => state.detail);

  /*   if (detail?.platforms[0].hasOwnProperty("platform")) {
    var apiPlatform = detail.platforms.map((p) => p.platform.name);
  }

  if (detail.platforms.hasOwnProperty("name")) {
    var dbPlatform = detail.platforms.map((p) => p.name);
  } */

  //console.log(detail.platforms.map((p) => p.platform.name)); PLATAFORMAS
  //console.log(detail.genres.map((g) => g.name).join("-")); GENEROS
  const imgUrl =
    "https://thumbs.dreamstime.com/b/se%C3%B1al-de-ne%C3%B3n-la-m%C3%A1quina-juego-arcada-122983326.jpg";
  return (
    <div className={styles.detailContainer}>
      <Link to="/home">
        <button className={styles.btn}>Home</button>
      </Link>
      <div className={styles.detailContainer}>
        <img
          className={`${styles.col} ${styles.imgDetail}`}
          src={detail.background_image || imgUrl}
          alt={detail.name}
        />
        <div className={`${styles.col} ${styles.gameDetails}`}>
          <p className={styles.firstItem}>
            <strong>Title: </strong> {detail.name}
          </p>

          <p>
            <strong>Released date:</strong>{" "}
            {detail.released || detail.releaseDate}
          </p>

          <p>
            <strong>Platforms: </strong>

            {detail.id.length > 7
              ? detail.platforms.map((p) => p.name).join(" - ")
              : detail.platforms.map((p) => p.platform.name).join(" - ")}
          </p>

          <p>
            <strong>Genres: </strong>
            {detail.genres?.map((g) => g.name).join("-")}
          </p>

          <p>
            <strong>Rating: </strong>
            {detail.rating}
          </p>

          <p>
            <strong>Description: </strong>
            {detail.description_raw || detail.description}
          </p>
        </div>
      </div>
    </div>
  );
}
