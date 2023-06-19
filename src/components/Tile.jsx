import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

function Tile({ dropPiece, constraints, number, img, piece, onDragStart }) {
  const color1 = "white";
  const color2 = "#3a5a40";

  if (number % 2 === 0) {
    return (
      <TileCase color={color1}>
        {img && <ChessPiece onDragStart={onDragStart} onDragEnd={(e) => dropPiece(e)} whileDrag={{ scale: 1.1 }} drag dragConstraints={constraints} className="chess-piece" img={img}></ChessPiece>}
      </TileCase>
    );
  } else {
    return (
      <TileCase color={color2}>
        {img && <ChessPiece onDragStart={onDragStart} onDragEnd={(e) => dropPiece(e)} whileDrag={{ scale: 1.1 }} drag dragConstraints={constraints} className="chess-piece" img={img}></ChessPiece>}
      </TileCase>
    );
  }
}

export default Tile;

const TileCase = styled.span`
  height: 100px;
  width: 100px;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChessPiece = styled(motion.div)`
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: 80px;
  :hover {
    cursor: grab;
  }
  :active {
    cursor: grabbing;
  }
`;
