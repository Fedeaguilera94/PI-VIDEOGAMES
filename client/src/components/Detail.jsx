import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import styles from "./Detail.module.css";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function Detail(props) {
  const dispatch = useDispatch();

  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getDetail(id));
  }, [id, dispatch]);
  const detail = useSelector((state) => state.detail);

  const imgUrl =
    "https://thumbs.dreamstime.com/b/se%C3%B1al-de-ne%C3%B3n-la-m%C3%A1quina-juego-arcada-122983326.jpg";

  return (
    <>
      <div className={styles.btnC}>
        <Link className={styles.btn} to="/home">
          <RiArrowGoBackFill /> Home
        </Link>
      </div>
      <div className={styles.line}>
        <img
          className={styles.linelink}
          alt="Line"
          src="https://hbomax-images.warnermediacdn.com/2021-09/hero_promo_purpline.png?host=wme-hbomax-drupal-prod.s3.amazonaws.com"
        />
      </div>
      <div className={styles.detailContainer}>
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

              {detail.id?.length > 7
                ? detail.platforms?.map((p) => p.name).join(" - ")
                : detail.platforms?.map((p) => p.platform.name).join(" - ")}
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
    </>
  );
}
