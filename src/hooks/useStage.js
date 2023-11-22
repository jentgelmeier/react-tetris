import React, { useEffect, useState } from "react";
import { STAGE_WIDTH, createStage } from "../utils/gameHelper";

export function useStage(player = {}, resetPlayer, resetOccurred, setResetOccurred, endGame) {
  const [stage, setStage] = useState(createStage());
  const [linesCleared, setLinesCleared] = useState(0);

  useEffect(() => {
    setLinesCleared(0);

    function clearLines(prevStage) {
      return prevStage.reduce((acc, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setLinesCleared((prev) => prev + 1);
          acc.unshift(new Array(STAGE_WIDTH).fill([0, "clear"]));
          return acc;
        }
        acc.push(row);
        return acc;
      }, []);
    }

    function updateStage(prevStage) {
      // flush the stage of falling blocks
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      // draw the active block
        player.tetromino.forEach((row, y) =>
          row.forEach((cell, x) => {
            if (cell !== 0) {
              if (resetOccurred) {
                if (prevStage[y + player.pos.y][x + player.pos.x][0] !== 0) {
                  endGame();
                  return;
                }
                setResetOccurred(false);
              }
              newStage[y + player.pos.y][x + player.pos.x] = [
                cell,
                player.collided ? "merged" : "clear",
              ];
            }
          })
        );

      if (player.collided) {
        return clearLines(newStage);
      }

      return newStage;
    }

    setStage((prev) => updateStage(prev));
    if (player.collided) resetPlayer();
  }, [player]);

  return [stage, setStage, linesCleared];
}
