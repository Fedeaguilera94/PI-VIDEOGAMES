import React from "react";

export default function Card({ name, image, genres }) {
  return (
    <div>
      <h1>{name}</h1>
      <img src={image} alt="img not found" />
      <p>{genres}</p>
    </div>
  );
}
