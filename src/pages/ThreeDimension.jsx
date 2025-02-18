import { useState, useEffect, useMemo, useCallback } from "react";
import { useThreeDimensionGenerateData } from "../utils/ThreeDimension/useGenerateData";
import { useThreeDimensionTrainingStep } from "../utils/ThreeDimension/useTrainingStep";
import { learningRate } from "../utils/learningRate";
import ThreeDimensionalPlot from "../components/ThreeDimensionalPlot";
import ControlPanel from "../components/ControlPanel";
import MetricsChart from "../components/MetricsChart";
import ColorPicker from "../components/ColorPicker";

const ThreeDimension = () => {
  const [shape, setShape] = useState("sphere");
  const [inputSize, setInputSize] = useState(36);
  const [dataSize, setDataSize] = useState(80);
  const { data, setData, generateData } = useThreeDimensionGenerateData(
    inputSize,
    dataSize,
    shape
  );
  const [iteration, setIteration] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [isLearningRateVariable, setIsLearningRateVariable] = useState(true);
  const [isNeighborhoodSizeVariable, setIsNeighborhoodSizeVariable] =
    useState(true);
  const [learningRateInput, setLearningRateInput] = useState(0.1);
  const [neighborhoodSizeInput, setNeighborhoodSizeInput] = useState(3);
  const [metrics, setMetrics] = useState([]);
  const [error, setError] = useState(0);
  const [selectedPalette, setSelectedPalette] = useState("default");
  const [customColors, setCustomColors] = useState({
    dataPoints: "#000000",
    weights: "#ef4444",
    opacity: 0.6,
  });

  const currentLearningRate = useMemo(
    () =>
      isLearningRateVariable ? learningRate(iteration) : learningRateInput,
    [isLearningRateVariable, iteration, learningRateInput]
  );

  const neighborhoodSize = useMemo(
    () =>
      isNeighborhoodSizeVariable
        ? (Math.sqrt(inputSize) / 2) * Math.exp(-iteration / 1000)
        : neighborhoodSizeInput,
    [isNeighborhoodSizeVariable, iteration, inputSize, neighborhoodSizeInput]
  );

  const trainingStep = useThreeDimensionTrainingStep(
    data,
    setData,
    iteration,
    setIteration,
    isLearningRateVariable,
    learningRateInput,
    isNeighborhoodSizeVariable,
    neighborhoodSizeInput
  );

  const calculateError = useCallback(() => {
    if (!data.X || !data.W || data.X.length === 0 || data.W.length === 0) {
      return 0;
    }

    let totalError = 0;
    const dataPoints = data.X;
    const weights = data.W;

    dataPoints.forEach((point) => {
      let minDistance = Infinity;
      weights.forEach((weight) => {
        const dx = point.x - weight.x;
        const dy = point.y - weight.y;
        const dz = point.z - weight.z;
        const distance = dx * dx + dy * dy + dz * dz;
        minDistance = Math.min(minDistance, distance);
      });
      totalError += minDistance;
    });

    return Math.sqrt(totalError / dataPoints.length);
  }, [data]);

  const handleGenerateData = useCallback(() => {
    setIteration(0);
    setMetrics([]);
    setIsTraining(false);
    generateData();
  }, [generateData]);

  const handleTrainingToggle = useCallback(() => {
    setIsTraining((prev) => !prev);
  }, []);

  useEffect(() => {
    const currentError = calculateError();
    setError(currentError);

    if (isTraining) {
      setMetrics((prev) => [
        ...prev,
        {
          iteration,
          error: currentError,
          learningRate: currentLearningRate,
          neighborhoodSize,
        },
      ]);
    }
  }, [
    iteration,
    calculateError,
    isTraining,
    currentLearningRate,
    neighborhoodSize,
  ]);

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

  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Three Dimension Visualization
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <span className="bg-blue-50 dark:bg-blue-900/30 px-2 sm:px-3 py-1 rounded-full text-sm sm:text-base text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
            Iteration: {iteration}
          </span>
          <span className="bg-indigo-50 dark:bg-indigo-900/30 px-2 sm:px-3 py-1 rounded-full text-sm sm:text-base text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
            Error: {error.toFixed(4)}
          </span>
        </div>
      </div>

      <ThreeDimensionalPlot
        dataPoints={data.X}
        weights={data.W}
        dataColor={customColors.dataPoints}
        weightColor={customColors.weights}
        opacity={customColors.opacity}
        showGrid={true}
        showAxes={true}
        showConnections={true}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-4">
        <button
          onClick={() => setShape("sphere")}
          className={`px-3 py-2 text-sm rounded-lg transition-all ${
            shape === "sphere"
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white shadow-md"
              : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 hover:shadow-sm"
          }`}
        >
          Sphere
        </button>
        <button
          onClick={() => setShape("cube")}
          className={`px-3 py-2 text-sm rounded-lg transition-all ${
            shape === "cube"
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white shadow-md"
              : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 hover:shadow-sm"
          }`}
        >
          Cube
        </button>
        <button
          onClick={() => setShape("spiral")}
          className={`px-3 py-2 text-sm rounded-lg transition-all ${
            shape === "spiral"
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white shadow-md"
              : "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 hover:shadow-sm"
          }`}
        >
          Spiral
        </button>
      </div>

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

      <MetricsChart metrics={metrics} />

      <ColorPicker
        selectedPalette={selectedPalette}
        onPaletteChange={setSelectedPalette}
        customColors={customColors}
        onCustomColorChange={setCustomColors}
      />

      <div className="flex flex-col sm:flex-row justify-center gap-4 pb-4">
        <button
          onClick={handleTrainingToggle}
          className={`w-full sm:w-auto px-6 py-2 rounded-lg font-medium transition-all ${
            isTraining
              ? "bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600 text-white shadow-md hover:shadow-lg"
              : "bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white shadow-md hover:shadow-lg"
          }`}
        >
          {isTraining ? "Stop" : "Start"}
        </button>
        <button
          onClick={handleGenerateData}
          className="w-full sm:w-auto px-6 py-2 rounded-lg font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 shadow-md hover:shadow-lg transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ThreeDimension;
