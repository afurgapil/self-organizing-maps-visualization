import { useCallback, useState } from "react";
import { randomNormal } from "../randomNormal";
export const useGenerateData = (inputNumber, dataSize, shape) => {
  const [data, setData] = useState({ X: [], labels: [], W: [] });

  const generateData = useCallback(() => {
    const X = [];
    const labels = [];
    switch (shape) {
      case "line":
        for (let i = 0; i < dataSize / 2; i++) {
          X.push({
            x: randomNormal(-5, 1),
            y: randomNormal(-5, 1),
            label: 0,
          });
          labels.push(0);
        }

        for (let i = 0; i < dataSize / 2; i++) {
          X.push({
            x: randomNormal(5, 1),
            y: randomNormal(5, 1),
            label: 1,
          });
          labels.push(1);
        }
        break;
      case "triangle":
        for (let i = 0; i < dataSize / 3; i++) {
          X.push({
            x: randomNormal(-5, 1),
            y: randomNormal(5, 1),
            label: 0,
          });
          labels.push(0);
        }

        for (let i = 0; i < dataSize / 3; i++) {
          X.push({
            x: randomNormal(5, 1),
            y: randomNormal(5, 1),
            label: 1,
          });
          labels.push(1);
        }

        for (let i = 0; i < dataSize / 3; i++) {
          X.push({
            x: randomNormal(0, 1),
            y: randomNormal(-5, 1),
            label: 1,
          });
          labels.push(1);
        }
        break;
      case "square":
        for (let i = 0; i < dataSize / 4; i++) {
          X.push({
            x: randomNormal(-5, 1),
            y: randomNormal(-5, 1),
            label: 0,
          });
          labels.push(0);
        }

        for (let i = 0; i < dataSize / 4; i++) {
          X.push({
            x: randomNormal(5, 1),
            y: randomNormal(5, 1),
            label: 1,
          });
          labels.push(1);
        }
        for (let i = 0; i < dataSize / 4; i++) {
          X.push({
            x: randomNormal(-5, 1),
            y: randomNormal(5, 1),
            label: 1,
          });
          labels.push(2);
        }
        for (let i = 0; i < dataSize / 4; i++) {
          X.push({
            x: randomNormal(5, 1),
            y: randomNormal(-5, 1),
            label: 1,
          });
          labels.push(3);
        }

        break;
      default:
        for (let i = 0; i < dataSize / 2; i++) {
          X.push({
            x: randomNormal(-5, 1),
            y: randomNormal(-5, 1),
            label: 0,
          });
          labels.push(0);
        }

        for (let i = 0; i < dataSize / 2; i++) {
          X.push({
            x: randomNormal(5, 1),
            y: randomNormal(5, 1),
            label: 1,
          });
          labels.push(1);
        }
        break;
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
  }, [dataSize, inputNumber, shape]);

  return { data, setData, generateData };
};
