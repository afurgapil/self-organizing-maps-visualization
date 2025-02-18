import { useCallback } from "react";
import { euclideanDistance3D } from "./euclideanDistance3D";
import { learningRate } from "../learningRate";

export const useThreeDimensionTrainingStep = (
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
    if (!data.X || !data.W || data.X.length === 0 || data.W.length === 0) {
      return;
    }

    const currentLearningRate = isLearningRateVariable
      ? learningRate(iteration)
      : learningRateInput;

    const currentNeighborhoodSize = isNeighborhoodSizeVariable
      ? (Math.sqrt(data.W.length) / 2) * Math.exp(-iteration / 1000)
      : neighborhoodSizeInput;

    // Select a random input vector
    const randomIndex = Math.floor(Math.random() * data.X.length);
    const input = data.X[randomIndex];

    // Find the winning neuron (closest weight)
    let minDistance = Infinity;
    let winningIndex = 0;

    data.W.forEach((weight, index) => {
      const distance = euclideanDistance3D(input, weight);
      if (distance < minDistance) {
        minDistance = distance;
        winningIndex = index;
      }
    });

    // Update weights
    const newWeights = data.W.map((weight, index) => {
      // Calculate grid distance to winning neuron
      const gridSize = Math.ceil(Math.sqrt(data.W.length));
      const winningRow = Math.floor(winningIndex / gridSize);
      const winningCol = winningIndex % gridSize;
      const currentRow = Math.floor(index / gridSize);
      const currentCol = index % gridSize;

      const gridDistance = Math.sqrt(
        Math.pow(currentRow - winningRow, 2) +
          Math.pow(currentCol - winningCol, 2)
      );

      // Calculate neighborhood effect
      const neighborhoodEffect = Math.exp(
        -(gridDistance * gridDistance) /
          (2 * currentNeighborhoodSize * currentNeighborhoodSize)
      );

      // Update weight
      return {
        ...weight,
        x:
          weight.x +
          currentLearningRate * neighborhoodEffect * (input.x - weight.x),
        y:
          weight.y +
          currentLearningRate * neighborhoodEffect * (input.y - weight.y),
        z:
          weight.z +
          currentLearningRate * neighborhoodEffect * (input.z - weight.z),
      };
    });

    setData((prev) => ({
      ...prev,
      W: newWeights,
    }));

    setIteration((prev) => prev + 1);
  }, [
    data,
    setData,
    iteration,
    setIteration,
    isLearningRateVariable,
    learningRateInput,
    isNeighborhoodSizeVariable,
    neighborhoodSizeInput,
  ]);
};
