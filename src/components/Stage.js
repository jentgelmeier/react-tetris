import React from "react";
import Cell from "./Cell";

function Stage({ stage }) {
  const height = stage.length;
  const width = stage[0].length;
  return (
    <div
      className="stage"
      style={{
        display: "grid",
        border: "2px solid #333",
        gap: "1px",
        // gridTemplateRows: `repeat(${height}, calc(25vw / ${width}))}`,
        gridTemplateColumns: `repeat(${width}, 1fr`,
        maxWidth: "800px",
        margin: '0 auto'
      }}
    >
      {stage.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell[0]} />)
      )}
    </div>
  );
}

export default Stage;
