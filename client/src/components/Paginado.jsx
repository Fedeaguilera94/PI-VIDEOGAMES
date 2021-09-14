import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({ gamesTotal, allVideoGames, paginado }) {
  const pageNum = []; //

  // redondear!!!!
  for (let i = 1; i <= Math.ceil(allVideoGames / gamesTotal); i++) {
    pageNum.push(i);
  }

  return (
    <ul className={style.pos}>
      {pageNum &&
        pageNum.map((number) => (
          <li className={style.list} key={number}>
            <a className={style.paginado} onClick={() => paginado(number)}>
              {number}
            </a>
          </li>
        ))}
    </ul>
  );
}
