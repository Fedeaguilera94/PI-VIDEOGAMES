import React, { useState, useEffect } from "react";
import { getGenres, postVideoGame } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "./GameCreated.module.css";
import { FaTrash } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function validate(input) {
  let error = {};
  if (!input.name.trim()) {
    error.name = "Name require";
  }
  if (!input.description.trim()) {
    error.description = "Description require";
  }
  if (!input.platforms.length) {
    error.platforms = "Platforms require";
  }
  return error;
}

export default function GameCreated() {
  const dispatch = useDispatch();
  const generos = useSelector((state) => state.genres);
  const plataformas = useSelector((state) => state.platforms);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: "",
    platforms: [],
    genres: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectPlatform(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    if (Object.keys(errors).length === 0) {
      dispatch(postVideoGame(input));
      alert("VideoGame create!");
      setInput({
        name: "",
        description: "",
        releaseDate: "",
        rating: "",
        platforms: [],
        genres: [],
      });
    } else {
      alert("ERROR! video game no creado");
      return;
    }
  }

  function handleDelete(e) {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== e),
    });
  }

  function handleDeletePlat(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((g) => g !== e),
    });
  }

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <>
      <div className={styles.btnH}>
        <Link className={styles.btn1} to="/home">
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
      <h1 className={styles.Title}>Create Your VideoGame</h1>
      <div className={styles.mainscreen}>
        <div className={styles.CreateVideogame}>
          <div className={styles.leftside}>
            <img
              src="https://thumbs.dreamstime.com/b/se%C3%B1al-de-ne%C3%B3n-la-m%C3%A1quina-juego-arcada-122983326.jpg"
              className={styles.product}
              alt="Shoes"
            />
          </div>
          <div className={styles.rightside}>
            <form
              className={styles.CreationForm}
              onSubmit={(e) => handleSubmit(e)}
            >
              <div>
                <input
                  className={styles.inputC}
                  placeholder="Name videogame"
                  required
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={(e) => handleChange(e)}
                />
                {errors.name && <p className={styles.errors}>{errors.name}</p>}
              </div>
              <div>
                <input
                  className={styles.inputC}
                  placeholder="Description videogame"
                  type="text"
                  required
                  value={input.description}
                  name="description"
                  onChange={(e) => handleChange(e)}
                />
                {errors.description && (
                  <p className={styles.errors}>{errors.description}</p>
                )}
              </div>

              <p>Platforms</p>
              <select
                className={styles.select}
                onChange={(e) => handleSelectPlatform(e)}
              >
                {plataformas.map((g) => (
                  <option value={g.name}>{g.name}</option>
                ))}
              </select>

              <div className={styles.genreC}>
                {input.platforms.map((g) => (
                  <div className={styles.genre}>
                    <p>{g}</p>
                    {/*        <button
                      className={styles.botonDelete}
                      onClick={() => handleDeletePlat(g)}
                    >
                      X
                    </button> */}
                    <FaTrash onClick={() => handleDeletePlat(g)} />
                  </div>
                ))}
              </div>
              {errors.platforms && (
                <p className={styles.errors}>{errors.platforms}</p>
              )}

              <div className={styles.expcvv}>
                <p className={styles.expcvv_text}>Release date</p>

                <div className={styles.dateC}>
                  <input
                    type="date"
                    value={input.releaseDate}
                    className={styles.inputC}
                    name="releaseDate"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <p className={styles.expcvv_text2}>Rating:</p>
                <div className={styles.dateC}>
                  <input
                    className={styles.rating}
                    type="number"
                    value={input.rating}
                    min="0"
                    max="5"
                    name="rating"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <p>Genres</p>

              <select
                className={styles.select}
                onChange={(e) => handleSelect(e)}
              >
                {generos.map((g) => (
                  <option key={g.name} value={g.name}>
                    {g.name}
                  </option>
                ))}
              </select>

              <div className={styles.genreC}>
                {input.genres.map((g) => (
                  <div key={g.name} className={styles.genre}>
                    <p>{g}</p>

                    <FaTrash onClick={() => handleDelete(g)} />
                  </div>
                ))}
              </div>

              <div className={styles.divHome}>
                <button type="submit" className={styles.btn}>
                  Create VideoGame
                </button>
              </div>
              {/*      <div className={styles.divHome}>
          <Link to="/home">
            <button className={styles.btnHome}>Home</button>
          </Link>
        </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
