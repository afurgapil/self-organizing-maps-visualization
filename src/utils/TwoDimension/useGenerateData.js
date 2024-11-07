import { useCallback, useState } from "react";
import { randomNormal } from "../randomNormal";
export const useGenerateData = (inputNumber) => {
  const [data, setData] = useState({ X: [], labels: [], W: [] });

  const generateData = useCallback(() => {
    const X = [];
    const labels = [];

    for (let i = 0; i < 50; i++) {
      X.push({
        x: randomNormal(-5, 1),
        y: randomNormal(-5, 1),
        label: 0,
      });
      labels.push(0);
    }

    for (let i = 0; i < 50; i++) {
      X.push({
        x: randomNormal(5, 1),
        y: randomNormal(5, 1),
        label: 1,
      });
      labels.push(1);
    }

    const W = [];
    for (let i = 0; i < inputNumber; i++) {
      W.push({
        x: randomNormal(0, 6),
        y: randomNormal(0, 6),
        type: "weight",
      });
    }

    setData({ X, labels, W });
  }, []);

  return { data, setData, generateData };
};
