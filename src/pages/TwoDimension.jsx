import { useState, useEffect, useMemo, useCallback } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGenerateData } from "../utils/TwoDimension/useGenerateData";
import { useTwoDimensionTrainingStep } from "../utils/TwoDimension/useTrainingStep";
import { learningRate } from "../utils/learningRate";
import MetricsChart from "../components/MetricsChart";
import ColorPicker from "../components/ColorPicker";

const TwoDimension = () => {
  const [shape, setShape] = useState("triangle");
  const [inputSize, setInputSize] = useState(36);
  const [dataSize, setDataSize] = useState(80);
  const { data, setData, generateData } = useGenerateData(
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

  const trainingStep = useTwoDimensionTrainingStep(
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
        const distance = dx * dx + dy * dy;
        minDistance = Math.min(minDistance, distance);
      });
      totalError += minDistance;
    });

    return Math.sqrt(totalError / dataPoints.length);
  }, [data]);

  const handleGenerateData = useCallback(() => {
    setIteration(0);
    setMetrics([]);
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
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Two Dimension Visualization
        </h2>
        <div className="flex items-center gap-4">
          <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
            Iteration: {iteration}
          </span>
          <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
            Error: {error.toFixed(4)}
          </span>
        </div>
      </div>
      <div className="bg-white rounded-lg mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart
            width={600}
            height={400}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="x"
              domain={[-8, 8]}
              tickFormatter={(value) => value.toFixed(2)}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[-8, 8]}
              tickFormatter={(value) => value.toFixed(2)}
            />
            <Tooltip />
            <Scatter
              name="Data Points"
              data={data.X}
              fill={customColors.dataPoints}
              opacity={customColors.opacity}
            />
            <Scatter
              name="Weights"
              data={data.W}
              fill={customColors.weights}
              shape="cross"
            />
          </ScatterChart>
        </ResponsiveContainer>

        <ColorPicker
          selectedPalette={selectedPalette}
          onPaletteChange={setSelectedPalette}
          customColors={customColors}
          onCustomColorChange={setCustomColors}
        />

        <MetricsChart metrics={metrics} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Animation Speed
              </label>
              <input
                type="range"
                min="0"
                max="90"
                step="5"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShape("triangle")}
                className={`px-4 py-2 rounded ${
                  shape === "triangle"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                Triangle
              </button>
              <button
                onClick={() => setShape("line")}
                className={`px-4 py-2 rounded ${
                  shape === "line" ? "bg-green-500 text-white" : "bg-gray-300"
                }`}
              >
                Line
              </button>
              <button
                onClick={() => setShape("square")}
                className={`px-4 py-2 rounded ${
                  shape === "square" ? "bg-green-500 text-white" : "bg-gray-300"
                }`}
              >
                Square
              </button>
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="flex flex-row justify-start items-center gap-x-2">
                <input
                  type="checkbox"
                  checked={isLearningRateVariable}
                  onChange={(e) => setIsLearningRateVariable(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  Variable Learning Rate
                </label>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-2">
                <input
                  type="checkbox"
                  checked={isNeighborhoodSizeVariable}
                  onChange={(e) =>
                    setIsNeighborhoodSizeVariable(e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  Variable Neighborhood Size
                </label>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-2">
                <input
                  type="number"
                  value={inputSize}
                  onChange={(e) => setInputSize(Number(e.target.value))}
                  className="w-1/4 px-2 py-1 text-lg font-semibold text-gray-900 border border-gray-300 rounded-md"
                />
                <label className="text-sm font-medium text-gray-700">
                  Input Size
                </label>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-2">
                <input
                  type="number"
                  value={dataSize}
                  onChange={(e) => setDataSize(Number(e.target.value))}
                  className="w-1/4 px-2 py-1 text-lg font-semibold text-gray-900 border border-gray-300 rounded-md"
                />
                <label className="text-sm font-medium text-gray-700">
                  Data Size
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Learning Rate</div>
              {isLearningRateVariable ? (
                <div className="text-lg font-semibold text-gray-900">
                  {currentLearningRate.toFixed(4)}
                </div>
              ) : (
                <input
                  type="number"
                  value={learningRateInput}
                  onChange={(e) => setLearningRateInput(Number(e.target.value))}
                  className="w-full px-2 py-1 text-lg font-semibold text-gray-900 border border-gray-300 rounded-md"
                />
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Neighborhood Size</div>
              {isNeighborhoodSizeVariable ? (
                <div className="text-lg font-semibold text-gray-900">
                  {neighborhoodSize.toFixed(2)}
                </div>
              ) : (
                <input
                  type="number"
                  value={neighborhoodSizeInput}
                  onChange={(e) =>
                    setNeighborhoodSizeInput(Number(e.target.value))
                  }
                  className="w-full px-2 py-1 text-lg font-semibold text-gray-900 border border-gray-300 rounded-md"
                />
              )}
            </div>
          </div>
        </div>

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
    </div>
  );
};

export default TwoDimension;
