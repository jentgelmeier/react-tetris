export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export function createStage() {
  return Array.from(new Array(STAGE_HEIGHT), (row) =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );
}
