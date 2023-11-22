export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export function createStage() {
  return Array.from(new Array(STAGE_HEIGHT), (row) =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );
}

export function checkCollision(player, stage, { x: moveX = 0, y: moveY = 0 }) {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[0].length; x++) {
      if (player.tetromino[y][x] !== 0) {
        if (
          // check if move goes out of top/bottom, goes out of sides, or collides with other blocks
          !stage[y + player.pos.y + moveY] ||
          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          return true;
        }
      }
    }
  }
}
