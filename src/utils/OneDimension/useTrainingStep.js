import { useCallback } from "react";
import { linearDistance } from "./linearDistance";
import { learningRate } from "../learningRate";
import { neighborhood } from "../neighborhood";

export const useOneDimensionTrainingStep = (
  data,
  setData,
  iteration,
  setIteration,
  isLearningRateVariable,
  learningRateInput,
  isNeighborhoodSizeVariable,
  neighborhoodSizeInput
) => {
  return useCallback(() => {
    setData((prevData) => {
      const { X, W } = prevData;

      const randomIndex = Math.floor(Math.random() * X.length);
      const x = X[randomIndex];

      let minDist = Infinity;
      let bmuIndex = 0;

      W.forEach((w, index) => {
        const dist = linearDistance(x, w);
        if (dist < minDist) {
          minDist = dist;
          bmuIndex = index;
        }
      });

      const lr = isLearningRateVariable
        ? learningRate(iteration)
        : learningRateInput;

      const sigma = isNeighborhoodSizeVariable
        ? Math.max(0.5, 2.0 * Math.exp(-iteration / 1000))
        : neighborhoodSizeInput;

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
  }, [
    setData,
    iteration,
    setIteration,
    isLearningRateVariable,
    learningRateInput,
    isNeighborhoodSizeVariable,
    neighborhoodSizeInput,
  ]);
};
