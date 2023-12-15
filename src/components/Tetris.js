import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

// Components
import Stage from "./Stage";
// import Window from "./Window";
import Display from "./Display";
import PlayButton from "./PlayButton";

// utils
import { checkCollision, createStage } from "../utils/gameHelper";

// custom hooks
import { useGameStatus } from "../hooks/useGameStatus";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";

function Tetris() {
  const [gameOver, setGameOver] = useState(false);
  const [gamePlaying, setGamePlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [dropTime, setDropTime] = useState(null);
  const ref = useRef(null);

  function endGame() {
    setGameOver(true);
    setDropTime(null);
  }

  const [
    player,
    updatePlayerPosition,
    resetPlayer,
    rotatePlayer,
    resetOccurred,
    setResetOccurred,
  ] = usePlayer();
  const [stage, setStage, linesCleared] = useStage(
    player,
    resetPlayer,
    resetOccurred,
    setResetOccurred,
    endGame
  );
  const [score, setScore, lines, setLines, level, setLevel] =
    useGameStatus(linesCleared);

  const levelForDropCalc = level < 30 ? level : 30;
  const dropSpeed = 1000 - (levelForDropCalc - 1) * 22;

  function movePlayer(direction) {
    if (!checkCollision(player, stage, { x: direction })) {
      updatePlayerPosition({ x: direction });
    }
  }

  function startGame() {
    setShowPlayButton(false);
    setGameOver(false);
    setGamePlaying(true);
    setGameStarted(true);
    setStage(createStage());
    resetPlayer();
    setScore(0);
    setLines(0);
    setLevel(1);
    setDropTime(dropSpeed);
    ref.current.focus();
  }

  function togglePause() {
    setDropTime(dropTime ? null : dropSpeed);
    setGamePlaying(!gamePlaying);
  }

  function drop() {
    if (!checkCollision(player, stage, { y: 1 })) {
      updatePlayerPosition({ y: 1 });
    } else {
      updatePlayerPosition({ collided: true });
    }
  }

  function dropPlayer() {
    setDropTime(null);
    drop();
  }

  function move({ keyCode }) {
    // console.log(keyCode);
    if (gamePlaying) {
      switch (keyCode) {
        case 37:
          movePlayer(-1);
          break;
        case 38:
          rotatePlayer(stage, 1);
          break;
        case 90:
          rotatePlayer(stage, -1);
          break;
        case 39:
          movePlayer(1);
          break;
        case 40:
          dropPlayer();
          break;
        default:
          break;
      }
    }
  }

  useInterval(() => {
    drop();
  }, dropTime);

  function handleKeyUp({ keyCode }) {
    if (keyCode === 40 && gamePlaying) {
      setDropTime(dropSpeed);
    }
  }

  // discarded attempts to use eventListeners for control input
  // useEffect(() => {
  //   function handleKeyUp({ keyCode }) {
  //     if (keyCode === 40) {
  //       setDropTime(1000);
  //     }
  //   }

  //   window.addEventListener("keydown", move);
  //   window.addEventListener("keyup", handleKeyUp);

  //   return () => {
  //     window.removeEventListener("keydown", move);
  //     window.removeEventListener("keyup", handleKeyUp);
  //   };
  // }, []);

  return (
    <div
      className="tetris-wrapper"
      ref={ref}
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={(e) => handleKeyUp(e)}
    >
      <div
        className="tetris-container"
      >
        <aside className="aside">
          {/* <Window title="Hold" /> */}
          <div>
            <Display text={`Score: ${score}`} />
            <Display text={`Lines: ${lines}`} />
            <Display text={`Level: ${level}`} />
            {gameOver && <Display text="Game Over" gameOver />}
          </div>
        </aside>
        <Stage stage={stage} style={{ opacity: gameStarted && !gamePlaying && "0.5" }}/>
        <aside className="aside">{/* <Window title="Next" /> */}</aside>

        <PlayButton
          text={gameOver ? "Play Again" : "Play"}
          show={gameOver ? true : showPlayButton}
          onClick={startGame}
        />

        <button
          className="btn btn-dark pause-button"
          type="button"
          onClick={() => togglePause()}
          style={{ display: !gameStarted && "none" }}
        >
          <FontAwesomeIcon icon={gamePlaying ? faPause : faPlay} size="xl" />
        </button>
      </div>
    </div>
  );
}

export default Tetris;
