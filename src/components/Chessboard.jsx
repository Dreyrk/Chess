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
import Referee from "../utils/Referee.js";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const initialBoard = []

// PIONS BLANC
for (let i = 0; i < 8; i++) {
  initialBoard.push({ image: pawnb, x: i, y: 6, type: "pawn", color: "black" });
}
// PIONS NOIR
for (let i = 0; i < 8; i++) {
  initialBoard.push({ image: pawnw, x: i, y: 1, type: "pawn", color: "white" });
}
// TOURS NOIR
initialBoard.push({ image: rookb, x: 0, y: 7, type: "rook", color: "black" });
initialBoard.push({ image: rookb, x: 7, y: 7, type: "pawn", color: "black" });
// TOURS BLANCHE
initialBoard.push({ image: rookw, x: 0, y: 0, type: "rook", color: "white" });
initialBoard.push({ image: rookw, x: 7, y: 0, type: "rook", color: "white" });
// CAVALIERS NOIR
initialBoard.push({ image: knightb, x: 1, y: 7, type: "knight", color: "black" });
initialBoard.push({ image: knightb, x: 6, y: 7, type: "knight", color: "black" });
// CAVALIERS BLANC
initialBoard.push({ image: knightw, x: 1, y: 0, type: "knight", color: "white" });
initialBoard.push({ image: knightw, x: 6, y: 0, type: "knight", color: "white" });
//FOUS NOIR
initialBoard.push({ image: bishopb, x: 2, y: 7, type: "bishop", color: "black" });
initialBoard.push({ image: bishopb, x: 5, y: 7, type: "bishop", color: "black" });
//FOUS BLANC
initialBoard.push({ image: bishopw, x: 2, y: 0, type: "bishop", color: "white" });
initialBoard.push({ image: bishopw, x: 5, y: 0, type: "bishop", color: "white" });
//ROYAUX NOIR
initialBoard.push({ image: kingb, x: 4, y: 7, type: "king", color: "black" });
initialBoard.push({ image: queenb, x: 3, y: 7, type: "queen", color: "black" });
//ROYAUX BLANC
initialBoard.push({ image: kingw, x: 4, y: 0, type: "king", color: "white" });
initialBoard.push({ image: queenw, x: 3, y: 0, type: "queen", color: "white" });


function Chessboard() {
  const chessBoardRef = useRef(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [teamColor, setTeamColor] = useState("")
  const [pieces, setPieces] = useState(initialBoard);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [currentPiece, setCurrentPiece] = useState(null);
  const referee = new Referee();
  let board = [];

  const startGame = (color) => {
    setGameStarted(true)
    setTeamColor(color)
  }

  const grabPiece = (e, piece) => {
    const tileSize = 100;
    const chessboard = chessBoardRef.current;
    const prevX = Math.floor((e.clientX - chessboard.offsetLeft) / tileSize)
    const prevY = Math.floor((e.clientY - chessboard.offsetTop) / tileSize)
    setGridX(prevX);
    setGridY(prevY);
    setCurrentPiece(piece)
    console.log(currentPiece)
  }

  const dropPiece = (e) => {
    const chessboard = chessBoardRef.current;
    const tileSize = 100;
    if (chessboard && currentPiece) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / tileSize);
      const y = Math.floor((e.clientY - chessboard.offsetTop) / tileSize);



      //UPDATE PIECE POSITION
      const newPieces = pieces.map((p) => {
        if (p === currentPiece) {
          const validMove = referee.isValidMove(gridX, gridY, x, y, p.type, p.color)
          if (validMove) {
            p.x = x;
            p.y = y;
          } else {
            p.x = gridX
            p.y = gridY
          }
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

      board.push(<Tile key={`${i}, ${j}`} team={teamColor} number={number} img={image} piece={piece} grabPiece={grabPiece} dropPiece={dropPiece} constraints={chessBoardRef} />);
    }
  }

  if (gameStarted) {
    return <ChessContainer team={teamColor} ref={chessBoardRef}>{board}</ChessContainer>
  } else {
    return (
      <Container>
        <StartBtn color={"white"} type="button" onClick={() => startGame("white")} >White</StartBtn>
        <StartBtn color={"black"} type="button" onClick={() => startGame("black")} >Black</StartBtn>
      </Container>
    )
  };
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
  transform: ${(props) => props.team === "white" && "rotateX(180deg)"};
`;

const Container = styled.div`
  height: 800px;
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 150px;
  background-color: green;
`;

const StartBtn = styled.button`
  height: 40px;
  width: 120px;
  border: 2px solid red;
  border-radius: 15px;
  box-shadow: 0px 4px 4px slategray;
  background-color: ${(props) => props.color};
  color: ${(props) => props.color === "black" ? "white" : "black"};
  font-weight: 700;
  font-size: 22px;
`
