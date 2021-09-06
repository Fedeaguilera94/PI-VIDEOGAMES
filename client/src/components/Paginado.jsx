import React from "react";

export default function Paginado({ gamesTotal, allVideoGames, paginado }) {
  const pageNum = []; //

  // redondear!!!!
  for (let i = 1; i <= Math.ceil(allVideoGames / gamesTotal); i++) {
    pageNum.push(i);
  }

  return (
    <nav>
      <ul className="paginado">
        {pageNum &&
          pageNum.map((number) => (
            <li className="number" key={number}>
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
