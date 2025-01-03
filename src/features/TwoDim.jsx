import { useState, useEffect, useCallback } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const TwoDim = () => {
  const [data, setData] = useState({ X: [], labels: [], W: [] });
  const [iteration, setIteration] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [speed, setSpeed] = useState(50);

  const generateData = useCallback(() => {
    const X = [];
    const labels = [];

    for (let i = 0; i < 50; i++) {
      X.push({
        x: randomNormal(-5, 1),
        y: randomNormal(-5, 1),
        label: 0,
      });
      labels.push(0);
    }

    for (let i = 0; i < 50; i++) {
      X.push({
        x: randomNormal(5, 1),
        y: randomNormal(5, 1),
        label: 1,
      });
      labels.push(1);
    }

    const W = Array.from({ length: 36 }, () => ({
      x: Math.random() * 12 - 6,
      y: Math.random() * 12 - 6,
      type: "weight",
    }));

    setData({ X, labels, W });
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
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  const learningRate = (s, k = -1 / 1000) => {
    return Math.exp(s * k);
  };

  const trainingStep = useCallback(() => {
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

      const newW = W.map((w, i) => {
        if (i === bmuIndex) {
          const lr = learningRate(iteration);
          return {
            x: w.x + lr * (x.x - w.x),
            y: w.y + lr * (x.y - w.y),
            type: "weight",
          };
        }
        return w;
      });

      return { ...prevData, W: newW };
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

        <div className="text-sm text-gray-600">Iteration: {iteration}</div>
      </div>
    </div>
  );
};

export default TwoDim;
