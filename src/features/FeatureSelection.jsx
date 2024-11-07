import { useState, useEffect, useCallback } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const FeatureSelection = () => {
  const [data, setData] = useState({ points: [], weights: [] });
  const [iteration, setIteration] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [speed, setSpeed] = useState(50);

  const initialize = useCallback(() => {
    const points = [
      ...Array.from({ length: 50 }, () => ({
        x: randomNormal(-5, 1),
        y: randomNormal(1, 0.5),
      })),
      ...Array.from({ length: 50 }, () => ({
        x: randomNormal(5, 1),
        y: randomNormal(-1, 0.5),
      })),
      ...Array.from({ length: 50 }, () => ({
        x: randomNormal(-1, 1),
        y: randomNormal(-0.75, 0.25),
      })),
    ];

    const weights = Array.from({ length: 20 }, () => ({
      x: randomNormal(0, 5),
      y: 0.5,
      type: "weight",
    }));

    setData({ points, weights });
  }, []);

  const randomNormal = (mean = 0, std = 1) => {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return (
      mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    );
  };

  const distance = (p1, p2) => {
    return Math.abs(p1.x - p2.x);
  };

  const neighborhood = (distance, sigma = 1.0) => {
    return Math.exp(-(distance * distance) / (2 * sigma * sigma));
  };

  const trainingStep = useCallback(() => {
    setData((prevData) => {
      const { points, weights } = prevData;

      const randomIndex = Math.floor(Math.random() * points.length);
      const selectedPoint = points[randomIndex];

      let minDist = Infinity;
      let bmuIndex = 0;

      weights.forEach((w, index) => {
        const dist = distance(selectedPoint, w);
        if (dist < minDist) {
          minDist = dist;
          bmuIndex = index;
        }
      });

      const sigma = Math.max(0.5, 2.0 * Math.exp(-iteration / 1000));
      const learningRate = 0.1 * Math.exp(-iteration / 2000);

      const newWeights = weights.map((w, i) => {
        const neighborhoodEffect = neighborhood(Math.abs(i - bmuIndex), sigma);
        return {
          x: w.x + learningRate * neighborhoodEffect * (selectedPoint.x - w.x),
          y: 0.5,
          type: "weight",
        };
      });

      return { points, weights: newWeights };
    });

    setIteration((prev) => prev + 1);
  }, [iteration]);

  useEffect(() => {
    let intervalId;
    if (isTraining) {
      intervalId = setInterval(trainingStep, 100 - speed);
    }
    return () => clearInterval(intervalId);
  }, [isTraining, trainingStep, speed]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="space-y-4">
        <ScatterChart
          width={600}
          height={300}
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
            domain={[-2, 2]}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <Tooltip />
          <Scatter
            name="Data Points"
            data={data.points}
            fill="#000000"
            opacity={0.6}
          />
          <Scatter
            name="SOM Neurons"
            data={data.weights}
            fill="#ff0000"
            shape="cross"
            size={100}
          />
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
              initialize();
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
          <div>
            Learning Rate: {(0.1 * Math.exp(-iteration / 2000)).toFixed(3)}
          </div>
          <div>
            Neighborhood Size:{" "}
            {Math.max(0.5, 2.0 * Math.exp(-iteration / 1000)).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSelection;
