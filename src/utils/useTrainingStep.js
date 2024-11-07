import { useCallback } from "react";
import { distance } from "./distance";
import { learningRate } from "./learningRate";
import { neighborhood } from "./neighborhood";
export const useTrainingStep = (data, setData, iteration, setIteration) => {
  return useCallback(() => {
    setData((prevData) => {
      const { X, W } = prevData;

      const randomIndex = Math.floor(Math.random() * X.length);
      const x = X[randomIndex];

      let minDist = Infinity;
      let bmuIndex = 0;

      W.forEach((w, index) => {
        const dist = distance(x, w);
        if (dist < minDist) {
          minDist = dist;
          bmuIndex = index;
        }
      });

      const lr = learningRate(iteration);
      const sigma = Math.max(0.5, 2.0 * Math.exp(-iteration / 1000));

      const newW = W.map((w, i) => {
        const neighborhoodEffect = neighborhood(Math.abs(i - bmuIndex), sigma);
        return {
          x: w.x + lr * neighborhoodEffect * (x.x - w.x),
          y: w.y,
          type: "weight",
        };
      });

      return { ...prevData, W: newW };
    });

    setIteration((prev) => prev + 1);
  }, [data, setData, iteration, setIteration]);
};
