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
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 my-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <span>Training Analyze</span>
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
          isOpen ? "opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-full h-[400px] sm:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={metrics}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="iteration"
                label={{
                  value: "Iteration",
                  position: "insideBottom",
                  offset: -5,
                  fontSize: 12,
                  fill: "#6B7280",
                }}
                tick={{ fontSize: 10, fill: "#6B7280" }}
                minTickGap={20}
              />
              <YAxis
                yAxisId="left"
                label={{
                  value: "Error",
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 12,
                  fill: "#6B7280",
                }}
                tick={{ fontSize: 10, fill: "#6B7280" }}
                width={35}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{
                  value: "Rates",
                  angle: 90,
                  position: "insideRight",
                  fontSize: 12,
                  fill: "#6B7280",
                }}
                tick={{ fontSize: 10, fill: "#6B7280" }}
                width={35}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.9)",
                  border: "1px solid #4B5563",
                  borderRadius: "4px",
                  fontSize: "12px",
                  padding: "4px 8px",
                  color: "#F3F4F6",
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "10px",
                  color: "#6B7280",
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="error"
                stroke="#ef4444"
                name="Error"
                dot={false}
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="learningRate"
                stroke="#3b82f6"
                name="Learning Rate"
                dot={false}
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="neighborhoodSize"
                stroke="#10b981"
                name="Neighborhood Size"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
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
