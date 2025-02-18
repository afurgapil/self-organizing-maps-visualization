import { useCallback, useState } from "react";
import { randomNormal } from "../randomNormal";

export const useGenerateData = (
  inputNumber,
  dataSize,
  shape,
  customPoints = []
) => {
  const [data, setData] = useState({ X: [], labels: [], W: [] });

  const generateData = useCallback(() => {
    const X = [];
    const labels = [];
    switch (shape) {
      case "custom":
        customPoints.forEach((point) => {
          X.push({
            x: point.x,
            y: point.y,
            label: point.label,
          });
          labels.push(point.label);
        });
        break;
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
      case "circle":
        for (let i = 0; i < dataSize / 2; i++) {
          const angle = (Math.PI * 2 * i) / (dataSize / 2);
          const radius = 5 + randomNormal(0, 0.5);
          X.push({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
            label: 0,
          });
          labels.push(0);
        }
        for (let i = 0; i < dataSize / 2; i++) {
          const angle = (Math.PI * 2 * i) / (dataSize / 2);
          const radius = 2 + randomNormal(0, 0.5);
          X.push({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
            label: 1,
          });
          labels.push(1);
        }
        break;

      case "spiral":
        for (let i = 0; i < dataSize / 2; i++) {
          const angle = (Math.PI * 4 * i) / (dataSize / 2);
          const radius = (5 * i) / (dataSize / 2) + randomNormal(0, 0.2);
          X.push({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
            label: 0,
          });
          labels.push(0);
        }
        for (let i = 0; i < dataSize / 2; i++) {
          const angle = (Math.PI * 4 * i) / (dataSize / 2) + Math.PI;
          const radius = (5 * i) / (dataSize / 2) + randomNormal(0, 0.2);
          X.push({
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle),
            label: 1,
          });
          labels.push(1);
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
  }, [dataSize, inputNumber, shape, customPoints]);

  return { data, setData, generateData };
};
