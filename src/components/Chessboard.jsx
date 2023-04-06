import React from "react";
import styled from "styled-components";
import pawnw from "../assets/pawn_w.png";
import pawnb from "../assets/pawn_b.png";
import rookb from "../assets/rook_b.png";
import rookw from "../assets/rook_w.png";
import knightw from "../assets/knight_w.png";
import knightb from "../assets/knight_b.png";
import bishopb from "../assets/bishop_b.png";
import bishopw from "../assets/bishop_w.png";
import kingw from "../assets/king_w.png";
import kingb from "../assets/king_b.png";
import queenw from "../assets/queen_w.png";
import queenb from "../assets/queen_b.png";

import Tile from "./Tile";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const pieces = [];

// PIONS BLANC
for (let i = 0; i < 8; i++) {
  pieces.push({ image: pawnb, x: i, y: 6 });
}
// PIONS NOIR
for (let i = 0; i < 8; i++) {
  pieces.push({ image: pawnw, x: i, y: 1 });
}
// TOURS NOIR
pieces.push({ image: rookb, x: 0, y: 7 });
pieces.push({ image: rookb, x: 7, y: 7 });
// TOURS BLANCHE
pieces.push({ image: rookw, x: 0, y: 0 });
pieces.push({ image: rookw, x: 7, y: 0 });
// CAVALIERS NOIR
pieces.push({ image: knightb, x: 1, y: 7 });
pieces.push({ image: knightb, x: 6, y: 7 });
// CAVALIERS BLANC
pieces.push({ image: knightw, x: 1, y: 0 });
pieces.push({ image: knightw, x: 6, y: 0 });
//FOUS NOIR
pieces.push({ image: bishopb, x: 2, y: 7 });
pieces.push({ image: bishopb, x: 5, y: 7 });
//FOUS BLANC
pieces.push({ image: bishopw, x: 2, y: 0 });
pieces.push({ image: bishopw, x: 5, y: 0 });
//ROYAUX NOIR
pieces.push({ image: kingb, x: 4, y: 7 });
pieces.push({ image: queenb, x: 3, y: 7 });
//ROYAUX BLANC
pieces.push({ image: kingw, x: 4, y: 0 });
pieces.push({ image: queenw, x: 3, y: 0 });

function Chessboard() {
  let board = [];

  for (let j = 0; j < verticalAxis.length; j++) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;
      let image;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(<Tile number={number} img={image} />);
    }
  }

  return <ChessContainer>{board}</ChessContainer>;
}

export default Chessboard;

const ChessContainer = styled.div`
  height: 800px;
  width: 800px;
  display: grid;
  grid-template-columns: repeat(8, 100px);
  grid-template-rows: repeat(8, 100px);
  border: 2px solid black;
  background-color: gray;
`;
