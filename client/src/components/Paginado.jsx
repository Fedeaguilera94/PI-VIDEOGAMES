import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ gamesTotal, allVideoGames, paginado }) {
  const pageNum = []; //

  // redondear!!!!
  for (let i = 1; i <= Math.ceil(allVideoGames / gamesTotal); i++) {
    pageNum.push(i);
  }

  return (
    <div className={style.pos}>
      {pageNum &&
        pageNum.map((number) => (
          <a key={number} onClick={() => paginado(number)}>
            {number}
          </a>
        ))}
    </div>
  );
}
