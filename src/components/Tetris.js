import React, { useEffect, useState } from "react";

// Components
import Stage from "./Stage";
// import Window from "./Window";
import Display from "./Display";

// utils
import { createStage } from "../utils/gameHelper";
import { useGameStatus } from "../hooks/useGameStatus";
import PlayButton from "./PlayButton";
import usePlayer from "../hooks/usePlayer";
import useStage from "../hooks/useStage";

function Tetris() {
  const [gameOver, setGameOver] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [dropTime, setDropTime] = useState(0);

  const [player, resetPlayer, updatePlayerPosition] = usePlayer();
  const [stage, setStage, linesCleared] = useStage(player, resetPlayer);
  const [score, setScore, lines, setLines, level, setLevel] = useGameStatus(linesCleared);

  useEffect(() => {
    window.addEventListener("keydown", move);

    return () => {
      window.removeEventListener("keydown", move);
    };
  }, []);

  function startGame() {
    setShowPlayButton(false);
    setGameOver(false);
    setStage(createStage())
    // start droptime
    resetPlayer();
  }

  function movePlayer(direction) {
    //check for collision then updatePlayerPosition()
    updatePlayerPosition({ x: direction });
  }
  function dropPlayer() {
    // check for collision
    drop();
  }
  function drop() {
    updatePlayerPosition({ y: 1 })
  }
  function move({ keyCode }) {
    // console.log(keyCode);
    switch (keyCode) {
      case 37:
        movePlayer(-1);
        break;
      // case 38:
      //   rotate(1);
      //   break;
      // case 90:
      //   rotate(-1);
      //   break;
      case 39:
        movePlayer(1);
        break;
      case 40:
        dropPlayer();
        break;
    }
  }

  return (
    <div className="tetris-container">
      <aside className="aside">
        {/* <Window title="Hold" /> */}
        <div>
          <Display text={`Score: ${score}`} />
          <Display text={`Lines: ${lines}`} />
          <Display text={`Level: ${level}`} />
          {gameOver && <Display text="Game Over" gameOver />}
        </div>
      </aside>
      <Stage stage={stage} />
      <aside className="aside">{/* <Window title="Next" /> */}</aside>

      <PlayButton
        text={gameOver ? "Play Again" : "Play"}
        show={showPlayButton}
        onClick={startGame}
      />
    </div>
  );
}

export default Tetris;
