import { useCallback, useState } from "react";
import { TETROMINOS, randomTetromino } from "../utils/tetrominos";
import { checkCollision } from "../utils/gameHelper";

export function usePlayer() {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });
  const [resetOccurred, setResetOccurred] = useState(false);

  function rotate(tetromino, direction) {
    for (let y = 0; y < tetromino.length; y++) {
      for (let x = 0; x < tetromino[0].length; x++) {
        tetromino[y][x] = player.tetromino[x][y];
      }
    }

    if (direction > 0) {
      tetromino.forEach((row) => row.reverse());
      return tetromino;
    }
    return tetromino.reverse();
  }

  function rotatePlayer(stage, direction) {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    rotate(clonedPlayer.tetromino, direction);
    if (!checkCollision(clonedPlayer, stage, {})) {
      setPlayer(clonedPlayer);
    } else {
      let offset = 1;
      while (offset <= clonedPlayer.tetromino.length) {
        clonedPlayer.pos.x = clonedPlayer.pos.x + offset;
        if (!checkCollision(clonedPlayer, stage, {})) {
          setPlayer(clonedPlayer);
          break;
        }
        clonedPlayer.pos.x = player.pos.x;
        clonedPlayer.pos.x = clonedPlayer.pos.x - offset;
        if (!checkCollision(clonedPlayer, stage, {})) {
          setPlayer(clonedPlayer);
          break;
        }
        clonedPlayer.pos.x = player.pos.x;
        offset++;
      }
    }
  }

  function updatePlayerPosition({ x = 0, y = 0, collided = false }) {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  }

  const resetPlayer = useCallback(() => {
    const [tetromino, type] = randomTetromino();
    setResetOccurred(true);

    setPlayer({
      pos: { x: type === "O" ? 4 : 3, y: type === "I" ? -1 : 0 },
      tetromino: tetromino.shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPosition, resetPlayer, rotatePlayer, resetOccurred, setResetOccurred];
}
