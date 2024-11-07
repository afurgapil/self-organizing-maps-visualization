import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceDot } from "recharts";

const App = () => {
  const [neurons, setNeurons] = useState([]);
  const [currentInput, setCurrentInput] = useState(null);
  const [iteration, setIteration] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [bmuIndex, setBMUIndex] = useState(0);

  const neuronCount = 10;
  const initialLearningRate = 0.1;
  const initialNeighborhoodRadius = neuronCount / 2;
  const maxIterations = 1000;

  const getCurrentLearningRate = (iteration) => {
    return initialLearningRate * Math.exp(-iteration / maxIterations);
  };

  const getCurrentRadius = (iteration) => {
    return (
      initialNeighborhoodRadius * Math.exp(-iteration / (maxIterations / 4))
    );
  };

  useEffect(() => {
    const initialNeurons = Array(neuronCount)
      .fill(0)
      .map(() => ({ weight: Math.random() * 100 }));
    setNeurons(initialNeurons);
  }, []);

  useEffect(() => {
    let interval;
    if (isTraining) {
      interval = setInterval(() => {
        trainStep();
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTraining]);

  const findBMU = (input) => {
    let minDist = Infinity;
    let bmuIndex = 0;
    neurons.forEach((neuron, index) => {
      const dist = Math.abs(input - neuron.weight);
      if (dist < minDist) {
        minDist = dist;
        bmuIndex = index;
      }
    });
    return bmuIndex;
  };

  const updateWeights = (input, bmuIndex) => {
    const currentLearningRate = getCurrentLearningRate(iteration);
    const currentRadius = getCurrentRadius(iteration);

    const newNeurons = neurons.map((neuron, i) => {
      const lateralDistance = Math.abs(i - bmuIndex);

      const neighborhoodEffect = Math.exp(
        -(lateralDistance * lateralDistance) /
          (2 * currentRadius * currentRadius)
      );

      const deltaWeight =
        currentLearningRate * neighborhoodEffect * (input - neuron.weight);

      return {
        weight: neuron.weight + deltaWeight,
      };
    });

    setNeurons(newNeurons);
  };

  const trainStep = () => {
    const input = Math.random() * 100;
    setCurrentInput(input);
    const bmuIndex = findBMU(input);
    setBMUIndex(bmuIndex);
    updateWeights(input, bmuIndex);
    setIteration((prev) => prev + 1);
  };

  const chartData = neurons.map((neuron, index) => ({
    index: index,
    weight: neuron.weight,
  }));

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center gap-6">
        <div className="w-full h-64 bg-white p-4 rounded-lg">
          <LineChart
            width={500}
            height={250}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <XAxis
              dataKey="index"
              label={{ value: "Neuron Position", position: "bottom" }}
            />
            <YAxis
              label={{
                value: "Weight Value",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#4F46E5"
              strokeWidth={2}
            />
            {currentInput !== null && (
              <ReferenceDot
                x={findBMU(currentInput)}
                y={currentInput}
                r={5}
                fill="#EF4444"
              />
            )}
          </LineChart>
        </div>

        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            onClick={trainStep}
          >
            Train Step
          </button>
          <button
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            onClick={() => {
              for (let i = 0; i < 10; i++) trainStep();
            }}
          >
            Train 10 Steps
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => setIsTraining(true)}
          >
            Start
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            onClick={() => setIsTraining(false)}
          >
            Stop
          </button>
        </div>

        <div className="text-center space-y-2 text-gray-700">
          <div className="font-medium">Iteration: {iteration}</div>
          {currentInput !== null && (
            <div className="font-medium">
              Current Input: {currentInput.toFixed(2)}
            </div>
          )}
          <div className="font-medium">BMU Index: {bmuIndex}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
