import { useCallback, useState } from "react";
import { randomNormal } from "../randomNormal";

export const useThreeDimensionGenerateData = (
  inputNumber,
  dataSize,
  shape = "sphere"
) => {
  const [data, setData] = useState({ X: [], labels: [], W: [] });

  const generateData = useCallback(() => {
    const X = [];
    const labels = [];

    switch (shape) {
      case "sphere":
        // Generate points on a sphere surface
        for (let i = 0; i < dataSize; i++) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const radius = 5 + randomNormal(0, 0.5);

          X.push({
            x: radius * Math.sin(phi) * Math.cos(theta),
            y: radius * Math.sin(phi) * Math.sin(theta),
            z: radius * Math.cos(phi),
            label: 0,
          });
          labels.push(0);
        }
        break;

      case "cube":
        // Generate points on cube surfaces
        for (let i = 0; i < dataSize; i++) {
          const face = Math.floor(Math.random() * 6);
          const x = randomNormal(0, 1);
          const y = randomNormal(0, 1);
          const z = randomNormal(0, 1);

          switch (face) {
            case 0:
              X.push({ x: 5, y: x, z: y, label: 0 });
              break;
            case 1:
              X.push({ x: -5, y: x, z: y, label: 1 });
              break;
            case 2:
              X.push({ x: x, y: 5, z: y, label: 2 });
              break;
            case 3:
              X.push({ x: x, y: -5, z: y, label: 3 });
              break;
            case 4:
              X.push({ x: x, y: y, z: 5, label: 4 });
              break;
            case 5:
              X.push({ x: x, y: y, z: -5, label: 5 });
              break;
          }
          labels.push(face);
        }
        break;

      case "spiral":
        // Generate 3D spiral points
        for (let i = 0; i < dataSize; i++) {
          const t = (i / dataSize) * 4 * Math.PI;
          const radius = 5 * (i / dataSize) + randomNormal(0, 0.2);

          X.push({
            x: radius * Math.cos(t),
            y: radius * Math.sin(t),
            z: 5 * (i / dataSize) + randomNormal(0, 0.2),
            label: 0,
          });
          labels.push(0);
        }
        break;

      default:
        // Generate random points in 3D space
        for (let i = 0; i < dataSize; i++) {
          X.push({
            x: randomNormal(0, 5),
            y: randomNormal(0, 5),
            z: randomNormal(0, 5),
            label: 0,
          });
          labels.push(0);
        }
    }

    // Generate weight points in a grid pattern
    const W = [];
    const gridSize = Math.ceil(Math.sqrt(inputNumber));
    const spacing = 10 / (gridSize - 1);

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (W.length < inputNumber) {
          W.push({
            x: -5 + i * spacing + randomNormal(0, 0.1),
            y: -5 + j * spacing + randomNormal(0, 0.1),
            z: randomNormal(0, 0.1),
            type: "weight",
          });
        }
      }
    }

    setData({ X, labels, W });
  }, [dataSize, inputNumber, shape]);

  return { data, setData, generateData };
};
