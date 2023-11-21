import React from "react";

function PlayButton({ text, show, onClick }) {
  return (
    <button className="fs-3 px-3 pt-2"
      type="button"
      onClick={onClick}
      style={{
        background: "#2a9a1c",
        display: show ? '' : 'none',
        color: 'white',
        position: 'absolute',
        top: '45%', 
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '20px',
      }}
    >
      {text}
    </button>
    );
}

export default PlayButton;
