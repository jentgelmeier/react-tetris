import React from "react";
import Stage from "./Stage";
import { createStage } from "../utils/gameHelper";

function Tetris() {
  return (
    <div className=""
      style={{
        padding: '40px',
      }}
    >
      <Stage stage={createStage()} />
    </div>
  );
}

export default Tetris;
