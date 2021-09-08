import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postCharacter, getGenres } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function GameCreated() {
  const dispatch = useDispatch();
  const generos = useSelector((state) => state.genres);

  const [input, setInput] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: "",
    platforms: "",
    genres: [],
  });

  useEffect(() => {
    dispatch(getGenres());
  }, []);
  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Created VideoGame</h1>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" value={input.name} name="name" />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={input.description} name="description" />
        </div>
        <div>
          <label>Release Date:</label>
          <input type="date" value={input.releaseDate} name="releaseDate" />
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" value={input.rating} name="rating" />
        </div>
        <div>
          <label>Platforms:</label>
          <input type="text" value={input.platforms} name="platforms" />
        </div>
      </form>
      <select>
        <option selected="true" disabled="disabled" value="">
          --GENRES--
        </option>
        {generos.map((g) => (
          <option value={g.name}>{g.name}</option>
        ))}
      </select>
    </div>
  );
}
