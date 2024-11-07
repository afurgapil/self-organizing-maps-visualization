import { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useGenerateData } from "../utils/TwoDimension/useGenerateData";
import { learningRate } from "../utils/learningRate";
import { useTrainingStep } from "../utils/TwoDimension/useTrainingStep";

const TwoDimThree = () => {
  const { data, setData, generateData } = useGenerateData(36);
  const [iteration, setIteration] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [neighborhoodSize, setNeighborhoodSize] = useState(3);

  const trainingStep = useTrainingStep(
    data,
    setData,
    iteration,
    setIteration,
    false
  );

  useEffect(() => {
    let intervalId;
    if (isTraining) {
      intervalId = setInterval(trainingStep, 100 - speed);
    }
    return () => clearInterval(intervalId);
  }, [isTraining, trainingStep, speed]);

  useEffect(() => {
    generateData();
  }, [generateData]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="space-y-4">
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
            fill={(entry) => (entry.label === 0 ? "#8884d8" : "#000000")}
            opacity={0.6}
          />
          <Scatter name="Weights" data={data.W} fill="#ff0000" shape="cross" />
        </ScatterChart>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsTraining(!isTraining)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-24"
          >
            {isTraining ? "Stop" : "Start"}
          </button>
          <button
            onClick={() => {
              setIteration(0);
              generateData();
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-24"
          >
            Reset
          </button>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="90"
              step="10"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <div>Iteration: {iteration}</div>
          <div>Learning Rate: {learningRate(iteration).toFixed(4)}</div>
          <div>Neighborhood Size: {neighborhoodSize.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default TwoDimThree;
