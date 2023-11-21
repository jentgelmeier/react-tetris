import { useCallback, useState } from "react";
import { TETROMINOS, randomTetromino } from "../utils/tetrominos";
import { STAGE_WIDTH } from "../utils/gameHelper";

function usePlayer() {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const resetPlayer = useCallback(() => {
    const [tetromino, type] = randomTetromino();

    setPlayer({
      pos: { x: type === "O" ? 4 : 3, y: type === "I" ? -2 : 0 },
      tetromino: tetromino.shape,
      collided: false,
    });
  }, []);

  function updatePlayerPosition({ x: moveX = 0, y: moveY = 0 }) {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + moveX, y: prev.pos.y + moveY },
    }));
  }
  console.log('player', player);

  return [player, resetPlayer, updatePlayerPosition];
}

export default usePlayer;
