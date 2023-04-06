import React from "react";
import styled from "styled-components";

import Chessboard from "./components/Chessboard";

function App() {
  return (
    <Page>
      <Chessboard />
    </Page>
  );
}

export default App;

const Page = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: grey;
`;
