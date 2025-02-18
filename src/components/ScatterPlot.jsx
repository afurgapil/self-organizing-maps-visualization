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
} from "recharts";

const ScatterPlot = ({ dataPoints, weights }) => {
  return (
    <div className="bg-white rounded-lg mb-6">
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            domain={[-8, 8]}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <YAxis
            type="number"
            dataKey="y"
            domain={[-1, 1]}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <Tooltip />
          <Scatter name="Data Points" data={dataPoints} />
          <Scatter name="Weights" data={weights} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

ScatterPlot.propTypes = {
  dataPoints: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      fill: PropTypes.string,
      opacity: PropTypes.number,
    })
  ).isRequired,
  weights: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      fill: PropTypes.string,
      shape: PropTypes.string,
    })
  ).isRequired,
};

export default memo(ScatterPlot);
