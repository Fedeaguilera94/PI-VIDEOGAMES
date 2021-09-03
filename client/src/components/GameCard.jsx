import React from "react";

export default function Card({ name, image, genre }) {
  let prueba = genre.map((e) => e.name);

  return (
    <div>
      <h1>{name}</h1>
      <img src={image} alt="img not found" />
      <p>Generos : {prueba.join("-")}</p>
    </div>
  );
}
