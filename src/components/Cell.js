import React from "react";
import { TETROMINOS } from "../utils/tetrominos";

function Cell({ type }) {
  return (
    <div
      style={{
        aspectRatio: 1,
        background: `rgba(${TETROMINOS[type].color}, 0.8)`,
        // border: !type ? '0px solid' : '4px solid',
        border: '5px solid',
        borderBottomColor: `rgba(${TETROMINOS[type].color}, 0.1)`,
        borderTopColor: `rgba(${TETROMINOS[type].color}, 1)`,
        borderRightColor: `rgba(${TETROMINOS[type].color}, 1)`,
        borderLeftColor: `rgba(${TETROMINOS[type].color}, 0.3)`,
      }}
    ></div> 
  )
}

export default React.memo(Cell);