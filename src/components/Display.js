import React from "react";

function Display({ text, gameOver = false }) {
  return (
    <div
      className="bg-black mb-3 p-2"
      style={{
        border: "3px solid #333",
        borderRadius: "10px",
        color: gameOver ? "red" : "#999999",
        fontSize: "0.8rem",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
}

export default Display;
