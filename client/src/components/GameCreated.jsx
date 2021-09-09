import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGenres, postVideoGame } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
  let error = {};
  if (!input.name) {
    error.name = "Name require";
  }
  if (!input.description) {
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
  const [errors, setErros] = useState({});

  const [input, setInput] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: "",
    platforms: "",
    genres: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErros(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        platforms: e.target.value,
      });
    }
  }

  function handleSelect(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault(); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log(input);
    dispatch(postVideoGame(input));
    alert("VideoGame create!");
    setInput({
      name: "",
      description: "",
      releaseDate: "",
      rating: "",
      platforms: "",
      genres: [],
    });
  }

  function handleDelete(e) {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== e),
    });
  }

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Created VideoGame</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Description:</label>
          <textarea
            type="text"
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Release Date:</label>
          <input
            type="date"
            value={input.releaseDate}
            name="releaseDate"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            value={input.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Platforms:</label>
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
        </div>

        <select onChange={(e) => handleSelect(e)}>
          {generos.map((g) => (
            <option value={g.name}>{g.name}</option>
          ))}
        </select>
        <ul>
          <li> {input.genres.map((g) => g + " ,")}</li>
        </ul>
        <button type="submit">Create VideoGame</button>
      </form>
      {input.genres.map((g) => (
        <div className="divGenre">
          <p>{g}</p>
          <button className="botonDelete" onClick={() => handleDelete(g)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}
