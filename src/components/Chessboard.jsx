import React, { useRef, useState } from "react";
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
import { useMotionValue } from "framer-motion";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const initialBoard = []

// PIONS BLANC
for (let i = 0; i < 8; i++) {
  initialBoard.push({ image: pawnb, x: i, y: 6 });
}
// PIONS NOIR
for (let i = 0; i < 8; i++) {
  initialBoard.push({ image: pawnw, x: i, y: 1 });
}
// TOURS NOIR
initialBoard.push({ image: rookb, x: 0, y: 7 });
initialBoard.push({ image: rookb, x: 7, y: 7 });
// TOURS BLANCHE
initialBoard.push({ image: rookw, x: 0, y: 0 });
initialBoard.push({ image: rookw, x: 7, y: 0 });
// CAVALIERS NOIR
initialBoard.push({ image: knightb, x: 1, y: 7 });
initialBoard.push({ image: knightb, x: 6, y: 7 });
// CAVALIERS BLANC
initialBoard.push({ image: knightw, x: 1, y: 0 });
initialBoard.push({ image: knightw, x: 6, y: 0 });
//FOUS NOIR
initialBoard.push({ image: bishopb, x: 2, y: 7 });
initialBoard.push({ image: bishopb, x: 5, y: 7 });
//FOUS BLANC
initialBoard.push({ image: bishopw, x: 2, y: 0 });
initialBoard.push({ image: bishopw, x: 5, y: 0 });
//ROYAUX NOIR
initialBoard.push({ image: kingb, x: 4, y: 7 });
initialBoard.push({ image: queenb, x: 3, y: 7 });
//ROYAUX BLANC
initialBoard.push({ image: kingw, x: 4, y: 0 });
initialBoard.push({ image: queenw, x: 3, y: 0 });

// let activePiece = null

// function grabPiece(e) {
//   const element = e.target;
//   if (element.classList.contains("chess-piece")) {
//     const x = e.clientX - 50;
//     const y = e.clientY - 50;

//     element.style.position = "absolute"
//     element.style.left = `${x}px`
//     element.style.top = `${y}px`

//     activePiece = element
//   }
// }
// function movePiece(e) {
//   if (activePiece && activePiece.classList.contains("chess-piece")) {
//     const x = e.clientX - 50;
//     const y = e.clientY - 50;

//     activePiece.style.position = "absolute"
//     activePiece.style.left = `${x}px`
//     activePiece.style.top = `${y}px`
//   }
// }

function Chessboard() {
  const chessBoardRef = useRef(null)
  const [pieces, setPieces] = useState(initialBoard);
  let board = [];
  const offset = useMotionValue(0)

  const dropPiece = (e) => {
    const chessboard = chessBoardRef.current
    if (chessboard) {
      const x = Math.floor(e.clientX - chessboard.offsetLeft / 100);
      const y = Math.floor(e.clientY - chessboard.offsetTop / 100);
      const newPieces = pieces.map((p) => {
        if (p.x === 1 && p.y === 0) {
          p.x = x;
          p.y = y;
        }
        return p;
      })
      setPieces(newPieces)
      console.log("left", x, "top", y, pieces)
    }
  }



  for (let j = 0; j < verticalAxis.length; j++) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;
      let image;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(<Tile dropPiece={dropPiece} constraints={chessBoardRef} key={`${i}, ${j}`} number={number} img={image} />);
    }
  }

  return <ChessContainer ref={chessBoardRef}>{board}</ChessContainer>;
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
