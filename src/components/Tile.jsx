import React from "react";
import styled from "styled-components";

function Tile({ number, img }) {
  const color1 = "white";
  const color2 = "#3a5a40";

  if (number % 2 === 0) {
    return (
      <TileCase color={color1}>
        {img && <ChessPiece src={img} alt="chess-piece" />}
      </TileCase>
    );
  } else {
    return (
      <TileCase color={color2}>
        {img && <ChessPiece src={img} alt="chess-piece" />}
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

const ChessPiece = styled.img`
  height: 80px;
  width: 80px;
`;
