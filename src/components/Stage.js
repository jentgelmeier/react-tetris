import React from "react";
import Cell from "./Cell";

function Stage({ stage, style }) {
  const height = stage.length;
  const width = stage[0].length;
  return (
    <div
      className="stage"
      style={style}
    >
      {stage.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell[0]} />)
      )}
    </div>
  );
}

export default Stage;
