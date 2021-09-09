import React from "react";
import { Link } from "react-router-dom";

export default function Card({ name, image, genres, id, rating }) {
  let genero = genres.map((e) => e.name);

  return (
    <div>
      <h1>{name}</h1>
      <img
        src={image || "https://myvideogamelist.com/assets/images/default.png"}
        alt="img not found"
        width="300px"
        height="170px"
      />
      <p>Generos : {genero.join("-")}</p>
      <p>Rating :{rating}</p>
    </div>
  );
}
