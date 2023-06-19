import React, { useRef, useState } from "react";
import styled from "styled-components";
//Pieces images
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


function Chessboard() {
  const chessBoardRef = useRef(null)
  const [pieces, setPieces] = useState(initialBoard);
  const [currentPiece, setCurrentPiece] = useState(null);
  let board = [];

  const dropPiece = (e) => {
    const chessboard = chessBoardRef.current;
    if (chessboard && currentPiece) {
      const tileSize = 100;
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / tileSize);
      const y = Math.floor((e.clientY - chessboard.offsetTop) / tileSize);
      const targetOccupied = pieces.some(p => p.x === x && p.y === y);
      if (targetOccupied) {
        // If the target position is occupied, do not update the position
        console.log("The target position is occupied. Invalid move.");
        return;
      }
      const newPieces = pieces.map((p) => {
        if (p === currentPiece) {
          p.x = x;
          p.y = y;
        }
        return p;
      });
      setPieces(newPieces);
      setCurrentPiece(null);
    }
  }




  for (let j = 0; j < verticalAxis.length; j++) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;
      let image;
      let piece;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
          piece = p;
        }
      });

      board.push(<Tile key={`${i}, ${j}`} number={number} img={image} piece={piece} onDragStart={() => setCurrentPiece(piece)} dropPiece={dropPiece} constraints={chessBoardRef} />);
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
