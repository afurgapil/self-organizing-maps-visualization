import { useState, useEffect, useMemo, useCallback } from "react";
import { learningRate } from "../utils/learningRate";
import { useOneDimensionGenerateData } from "../utils/OneDimension/useGenerateData";
import { useOneDimensionTrainingStep } from "../utils/OneDimension/useTrainingStep";
import ScatterPlot from "../components/ScatterPlot";
import ControlPanel from "../components/ControlPanel";

const OneDimension = () => {
  const [inputSize, setInputSize] = useState(20);
  const [dataSize, setDataSize] = useState(80);
  const { data, setData, generateData } = useOneDimensionGenerateData(
    inputSize,
    dataSize
  );
  const [iteration, setIteration] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [isLearningRateVariable, setIsLearningRateVariable] = useState(false);
  const [isNeighborhoodSizeVariable, setIsNeighborhoodSizeVariable] =
    useState(false);
  const [learningRateInput, setLearningRateInput] = useState(0.1);
  const [neighborhoodSizeInput, setNeighborhoodSizeInput] = useState(1);

  const trainingStep = useOneDimensionTrainingStep(
    data,
    setData,
    iteration,
    setIteration,
    isLearningRateVariable,
    learningRateInput,
    isNeighborhoodSizeVariable,
    neighborhoodSizeInput
  );

  const handleGenerateData = useCallback(() => {
    setIteration(0);
    generateData();
  }, [generateData]);

  const handleTrainingToggle = useCallback(() => {
    setIsTraining((prev) => !prev);
  }, []);

  useEffect(() => {
    let intervalId;
    if (isTraining) {
      intervalId = setInterval(trainingStep, 100 - speed);
    }
    return () => clearInterval(intervalId);
  }, [isTraining, trainingStep, speed]);

  useEffect(() => {
    handleGenerateData();
  }, [handleGenerateData]);

  const currentLearningRate = useMemo(
    () =>
      isLearningRateVariable ? learningRate(iteration) : learningRateInput,
    [isLearningRateVariable, iteration, learningRateInput]
  );

  const neighborhoodSize = useMemo(
    () =>
      isNeighborhoodSizeVariable
        ? Math.max(0.5, 2.0 * Math.exp(-iteration / 1000))
        : neighborhoodSizeInput,
    [isNeighborhoodSizeVariable, iteration, neighborhoodSizeInput]
  );

  const chartData = useMemo(
    () => ({
      dataPoints: data.X.map((point) => ({
        ...point,
        fill: "#000000",
        opacity: 0.6,
      })),
      weights: data.W.map((point) => ({
        ...point,
        fill: "#ef4444",
        shape: "cross",
      })),
    }),
    [data.X, data.W]
  );

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          One Dimension Visualization
        </h2>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
          Iteration: {iteration}
        </span>
      </div>

      <ScatterPlot
        dataPoints={chartData.dataPoints}
        weights={chartData.weights}
      />

      <ControlPanel
        speed={speed}
        onSpeedChange={setSpeed}
        isLearningRateVariable={isLearningRateVariable}
        onLearningRateVariableChange={setIsLearningRateVariable}
        isNeighborhoodSizeVariable={isNeighborhoodSizeVariable}
        onNeighborhoodSizeVariableChange={setIsNeighborhoodSizeVariable}
        inputSize={inputSize}
        onInputSizeChange={setInputSize}
        dataSize={dataSize}
        onDataSizeChange={setDataSize}
        learningRateInput={learningRateInput}
        onLearningRateInputChange={setLearningRateInput}
        neighborhoodSizeInput={neighborhoodSizeInput}
        onNeighborhoodSizeInputChange={setNeighborhoodSizeInput}
        currentLearningRate={currentLearningRate}
        neighborhoodSize={neighborhoodSize}
      />

      <div className="flex justify-center space-x-4">
        <button
          onClick={handleTrainingToggle}
          className={`px-6 py-2 rounded-lg font-medium ${
            isTraining
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isTraining ? "Stop" : "Start"}
        </button>
        <button
          onClick={handleGenerateData}
          className="px-6 py-2 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default OneDimension;
