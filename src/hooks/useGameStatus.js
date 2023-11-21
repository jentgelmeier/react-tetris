import { useState } from "react";

export function useGameStatus(linesCleared) {
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);

  return [score, setScore, lines, setLines, level, setLevel];
}
