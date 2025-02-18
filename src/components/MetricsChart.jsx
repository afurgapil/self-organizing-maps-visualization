import { memo, useState } from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MetricsChart = ({ metrics }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-lg mb-6 p-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between mb-4 text-lg font-semibold text-gray-800 hover:text-gray-600 transition-colors"
      >
        <span>Training Metrics</span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="iteration"
              label={{
                value: "Iteration",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              yAxisId="error"
              label={{ value: "Error", angle: -90, position: "insideLeft" }}
            />
            <YAxis
              yAxisId="rate"
              orientation="right"
              label={{ value: "Rates", angle: 90, position: "insideRight" }}
            />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="error"
              type="monotone"
              dataKey="error"
              stroke="#8884d8"
              name="Error"
              dot={false}
            />
            <Line
              yAxisId="rate"
              type="monotone"
              dataKey="learningRate"
              stroke="#82ca9d"
              name="Learning Rate"
              dot={false}
            />
            <Line
              yAxisId="rate"
              type="monotone"
              dataKey="neighborhoodSize"
              stroke="#ffc658"
              name="Neighborhood Size"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

MetricsChart.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      iteration: PropTypes.number.isRequired,
      error: PropTypes.number.isRequired,
      learningRate: PropTypes.number.isRequired,
      neighborhoodSize: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default memo(MetricsChart);
