import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGenres, postVideoGame } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "./GameCreated.module.css";

function validate(input) {
  let error = {};
  if (!input.name.trim()) {
    error.name = "Name require";
  }
  if (!input.description.trim()) {
    error.description = "Description require";
  }
  if (!input.platforms) {
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
    platforms: [], // era string[{name:ps5},{name:}]
    genres: [],
  });
  console.log(input);
  console.log(errors);
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
    e.preventDefault(); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
        platforms: [], // era string
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
    <div className={styles.CreateVideogame}>
      <h1 className={styles.Title}>Create Your VideoGame</h1>
      <form className={styles.CreationForm} onSubmit={(e) => handleSubmit(e)}>
        <div>
          {/*   <label>Name:</label> */}
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
          {/*   <label>Description:</label> */}
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

        {/*                    PRUEBA                                    */}

        <select onChange={(e) => handleSelectPlatform(e)}>
          {plataformas.map((g) => (
            <option value={g.name}>{g.name}</option>
          ))}
        </select>

        {input.platforms.map((g) => (
          <div className="divGenre">
            <p>{g}</p>
            <button
              className={styles.botonDelete}
              onClick={() => handleDeletePlat(g)}
            >
              X
            </button>
          </div>
        ))}

        {/*   <div className={styles.Checkbox}>
          <p>Platforms:</p>
          <label>
            <input
              type="checkbox"
              name="platforms"
              value="Ps5"
              onChange={(e) => handleCheck(e)}
            />
            PS5
          </label>
          <label>
            <input
              type="checkbox"
              name="platforms"
              value="SEGA"
              onChange={(e) => handleCheck(e)}
            />
            SEGA
          </label>
          <label>
            <input
              type="checkbox"
              name="platforms"
              value="LINUX"
              onChange={(e) => handleCheck(e)}
            />
            LINUX
          </label>
          <label>
            <input
              type="checkbox"
              name="platforms"
              value="Pc"
              onChange={(e) => handleCheck(e)}
            />
            Pc
          </label>
          <label>
            <input
              type="checkbox"
              name="platforms"
              value="Xbox"
              onChange={(e) => handleCheck(e)}
            />
            Xbox
          </label>
          {errors.platforms && (
            <p className={styles.errors}>{errors.platforms}</p>
          )}
        </div> */}

        <div>
          {/*   <label>Release Date:</label> */}
          <p>Release date</p>
          <input
            type="date"
            value={input.releaseDate}
            name="releaseDate"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          {/*  <label>Rating:</label> */}
          <p>Rating:</p>
          <input
            type="number"
            value={input.rating}
            min="0"
            max="5"
            name="rating"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <select onChange={(e) => handleSelect(e)}>
          {generos.map((g) => (
            <option value={g.name}>{g.name}</option>
          ))}
        </select>

        {input.genres.map((g) => (
          <div className="divGenre">
            <p>{g}</p>
            <button
              className={styles.botonDelete}
              onClick={() => handleDelete(g)}
            >
              X
            </button>
          </div>
        ))}
        <div className={styles.divHome}>
          <button type="submit" className={styles.btnHome}>
            Create VideoGame
          </button>
        </div>
        <div className={styles.divHome}>
          <Link to="/home">
            <button className={styles.btnHome}>Home</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
