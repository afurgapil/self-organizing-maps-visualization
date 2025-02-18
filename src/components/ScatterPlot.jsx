import { memo } from "react";
import PropTypes from "prop-types";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";

const ScatterPlot = ({
  dataPoints,
  weights,
  dataColor,
  dataShape,
  weightColor,
  weightShape,
  showLines,
  lineColor,
  lineWidth,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 mb-4">
      <div className="w-full aspect-[4/3] sm:aspect-[16/9]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              type="number"
              dataKey="x"
              name="X"
              tick={{ fontSize: 10, fill: "#6B7280" }}
              domain={["dataMin - 1", "dataMax + 1"]}
              label={{
                value: "X",
                position: "insideBottom",
                offset: -10,
                fill: "#6B7280",
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Y"
              tick={{ fontSize: 10, fill: "#6B7280" }}
              domain={["dataMin - 1", "dataMax + 1"]}
              label={{
                value: "Y",
                angle: -90,
                position: "insideLeft",
                offset: -10,
                fill: "#6B7280",
              }}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.9)",
                border: "1px solid #4B5563",
                borderRadius: "4px",
                fontSize: "12px",
                padding: "4px 8px",
                color: "#F3F4F6",
              }}
              labelStyle={{ color: "#F3F4F6" }}
              itemStyle={{ color: "#F3F4F6" }}
            />
            <Scatter
              name="Data Points"
              data={dataPoints}
              fill={dataColor}
              shape={dataShape}
            />
            <Scatter
              name="Weights"
              data={weights}
              fill={weightColor}
              shape={weightShape}
            />
            {showLines &&
              weights.map((weight, i) => {
                const nextWeight = weights[(i + 1) % weights.length];
                return (
                  <Line
                    key={i}
                    type="linear"
                    dataKey="y"
                    stroke={lineColor}
                    strokeWidth={lineWidth}
                    data={[weight, nextWeight]}
                    dot={false}
                  />
                );
              })}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

ScatterPlot.propTypes = {
  dataPoints: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })
  ).isRequired,
  weights: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })
  ).isRequired,
  dataColor: PropTypes.string.isRequired,
  dataShape: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  weightColor: PropTypes.string.isRequired,
  weightShape: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  showLines: PropTypes.bool.isRequired,
  lineColor: PropTypes.string.isRequired,
  lineWidth: PropTypes.number.isRequired,
};

export default memo(ScatterPlot);
