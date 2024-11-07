import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceDot,
  CartesianGrid,
} from "recharts";

const App = () => {
  const [neurons, setNeurons] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [iteration, setIteration] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [bmuIndices, setBmuIndices] = useState([]);

  const neuronCount = 10;
  const inputCount = 3;
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

    const initialInputs = Array(inputCount)
      .fill(0)
      .map(() => Math.random() * 100);
    setInputs(initialInputs);

    const initialBMUs = initialInputs.map((input) =>
      findBMU(initialNeurons, input)
    );
    setBmuIndices(initialBMUs);
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

  const findBMU = (currentNeurons, input) => {
    let minDist = Infinity;
    let bmuIndex = 0;
    currentNeurons.forEach((neuron, index) => {
      const dist = Math.abs(input - neuron.weight);
      if (dist < minDist) {
        minDist = dist;
        bmuIndex = index;
      }
    });
    return bmuIndex;
  };

  const generateNextInputs = () => {
    return inputs.map((currentInput, idx) => {
      const bmuIndex = bmuIndices[idx];
      const bmuWeight = neurons[bmuIndex].weight;

      const leftNeighbor =
        bmuIndex > 0 ? neurons[bmuIndex - 1].weight : bmuWeight;
      const rightNeighbor =
        bmuIndex < neuronCount - 1 ? neurons[bmuIndex + 1].weight : bmuWeight;

      const neighborInfluence = (leftNeighbor + rightNeighbor) / 2;
      const newInput = (bmuWeight + neighborInfluence) / 2;

      const noise = (Math.random() - 0.5) * 10;

      return Math.max(0, Math.min(100, newInput + noise));
    });
  };

  const updateWeights = (currentInputs, bmuIndices) => {
    const currentLearningRate = getCurrentLearningRate(iteration);
    const currentRadius = getCurrentRadius(iteration);

    const newNeurons = neurons.map((neuron, neuronIdx) => {
      let totalDelta = 0;

      currentInputs.forEach((input, inputIdx) => {
        const bmuIdx = bmuIndices[inputIdx];
        const lateralDistance = Math.abs(neuronIdx - bmuIdx);

        const neighborhoodEffect = Math.exp(
          -(lateralDistance * lateralDistance) /
            (2 * currentRadius * currentRadius)
        );

        const delta =
          currentLearningRate * neighborhoodEffect * (input - neuron.weight);
        totalDelta += delta;
      });

      return {
        weight: neuron.weight + totalDelta / currentInputs.length,
      };
    });

    setNeurons(newNeurons);
  };

  const trainStep = () => {
    const nextInputs = generateNextInputs();
    setInputs(nextInputs);

    const nextBMUs = nextInputs.map((input) => findBMU(neurons, input));
    setBmuIndices(nextBMUs);

    updateWeights(nextInputs, nextBMUs);
    setIteration((prev) => prev + 1);
  };

  const chartData = neurons.map((neuron, index) => ({
    index: index,
    weight: neuron.weight,
  }));

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          1D Self-Organizing Map with Multiple Inputs
        </h2>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="w-full h-64 bg-white p-4 rounded-lg">
          <LineChart
            width={500}
            height={250}
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
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
            {inputs.map((input, idx) => (
              <ReferenceDot
                key={idx}
                x={bmuIndices[idx]}
                y={input}
                r={5}
                fill={["#EF4444", "#3B82F6", "#10B981"][idx]}
              />
            ))}
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
          <div className="font-medium">
            {inputs.map((input, idx) => (
              <div key={idx}>
                Input {idx + 1}: {input.toFixed(2)} (BMU: {bmuIndices[idx]})
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
