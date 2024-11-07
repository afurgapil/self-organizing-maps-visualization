import { useCallback, useState } from "react";
import { randomNormal } from "../randomNormal";
export const useGenerateData = () => {
  const [data, setData] = useState({ X: [], labels: [], W: [] });

  const generateData = useCallback(() => {
    const X = [];
    const labels = [];

    for (let i = 0; i < 50; i++) {
      X.push({ x: randomNormal(-5, 1), y: 0, label: 0 });
      labels.push(0);
    }

    for (let i = 0; i < 50; i++) {
      X.push({ x: randomNormal(5, 1), y: 0, label: 1 });
      labels.push(1);
    }

    const numWeights = 20;
    const W = Array.from({ length: numWeights }, () => ({
      x: randomNormal(0, 5),
      y: 0.5,
      type: "weight",
    }));

    setData({ X, labels, W });
  }, []);

  return { data, setData, generateData };
};
