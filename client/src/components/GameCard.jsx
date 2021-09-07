import React from "react";

export default function Card({ name, image, genres, rating }) {
  let genero = genres.map((e) => e.name);

  return (
    <div>
      <h1>{name}</h1>
      <img src={image} alt="img not found" width="300px" height="170px" />
      <p>Generos : {genero.join("-")}</p>
      <p>Rating :{rating}</p>
    </div>
  );
}
