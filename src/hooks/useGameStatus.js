import { useEffect, useState } from "react";

export function useGameStatus(linesCleared) {
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);

  const scoreTemplate = [40, 100, 300, 1200];

  useEffect(() => {
    if (linesCleared > 0) {
      setLines((prev) => prev + linesCleared);
      setScore((prev) => prev + scoreTemplate[linesCleared - 1] * level);
    }
  }, [linesCleared, score]);

  useEffect(() => {
    if (lines >= level * 10) {
      setLevel(prev => prev + 1);
    }
  }, [lines]);

  return [score, setScore, lines, setLines, level, setLevel];
}
