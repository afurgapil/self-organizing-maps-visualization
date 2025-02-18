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
import CustomShapeDrawer from "../components/CustomShapeDrawer";
import ControlPanel from "../components/ControlPanel";

const TwoDimension = () => {
  const [shape, setShape] = useState("triangle");
  const [inputSize, setInputSize] = useState(36);
  const [dataSize, setDataSize] = useState(80);
  const [customPoints, setCustomPoints] = useState([]);
  const { data, setData, generateData } = useGenerateData(
    inputSize,
    dataSize,
    shape,
    customPoints
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

  const handleCustomPointsChange = (newPoints) => {
    setCustomPoints(newPoints);
    if (newPoints.length === 0) {
      setShape("triangle");
    }
  };

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

        <div className="flex items-center gap-2 flex-wrap my-4">
          <button
            onClick={() => {
              setShape("custom");
              setCustomPoints([]);
            }}
            className={`px-4 py-2 rounded ${
              shape === "custom" ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
          >
            Custom
          </button>
          <button
            onClick={() => setShape("triangle")}
            className={`px-4 py-2 rounded ${
              shape === "triangle" ? "bg-green-500 text-white" : "bg-gray-300"
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
          <button
            onClick={() => setShape("circle")}
            className={`px-4 py-2 rounded ${
              shape === "circle" ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
          >
            Circle
          </button>
          <button
            onClick={() => setShape("spiral")}
            className={`px-4 py-2 rounded ${
              shape === "spiral" ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
          >
            Spiral
          </button>
        </div>

        {shape === "custom" && (
          <CustomShapeDrawer
            onPointsChange={handleCustomPointsChange}
            customColors={customColors}
          />
        )}

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

        <div className="flex justify-center space-x-4 mt-4">
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
