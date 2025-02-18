import { memo } from "react";
import PropTypes from "prop-types";

const ControlPanel = ({
  speed,
  onSpeedChange,
  isLearningRateVariable,
  onLearningRateVariableChange,
  isNeighborhoodSizeVariable,
  onNeighborhoodSizeVariableChange,
  inputSize,
  onInputSizeChange,
  dataSize,
  onDataSizeChange,
  learningRateInput,
  onLearningRateInputChange,
  neighborhoodSizeInput,
  onNeighborhoodSizeInputChange,
  currentLearningRate,
  neighborhoodSize,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Animation Speed
          </label>
          <input
            type="range"
            min="0"
            max="90"
            step="5"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-row justify-start items-center gap-x-2">
            <input
              type="checkbox"
              checked={isLearningRateVariable}
              onChange={(e) => onLearningRateVariableChange(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label className="text-sm font-medium text-gray-700">
              Variable Learning Rate
            </label>
          </div>
          <div className="flex flex-row justify-start items-center gap-x-2">
            <input
              type="checkbox"
              checked={isNeighborhoodSizeVariable}
              onChange={(e) =>
                onNeighborhoodSizeVariableChange(e.target.checked)
              }
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label className="text-sm font-medium text-gray-700">
              Variable Neighborhood Size
            </label>
          </div>
          <div className="flex flex-row justify-start items-center gap-x-2">
            <input
              type="number"
              value={inputSize}
              onChange={(e) => onInputSizeChange(Number(e.target.value))}
              className="w-1/4 px-2 py-1 text-lg font-semibold text-gray-900 border border-gray-300 rounded-md"
            />
            <label className="text-sm font-medium text-gray-700">
              Input Size
            </label>
          </div>
          <div className="flex flex-row justify-start items-center gap-x-2">
            <input
              type="number"
              value={dataSize}
              onChange={(e) => onDataSizeChange(Number(e.target.value))}
              className="w-1/4 px-2 py-1 text-lg font-semibold text-gray-900 border border-gray-300 rounded-md"
            />
            <label className="text-sm font-medium text-gray-700">
              Data Size
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">Learning Rate</div>
          {isLearningRateVariable ? (
            <div className="text-lg font-semibold text-gray-900">
              {currentLearningRate.toFixed(4)}
            </div>
          ) : (
            <input
              type="number"
              value={learningRateInput}
              onChange={(e) =>
                onLearningRateInputChange(Number(e.target.value))
              }
              className="w-full px-2 py-1 text-lg font-semibold text-gray-900 border border-gray-300 rounded-md"
            />
          )}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">Neighborhood Size</div>
          {isNeighborhoodSizeVariable ? (
            <div className="text-lg font-semibold text-gray-900">
              {neighborhoodSize.toFixed(2)}
            </div>
          ) : (
            <input
              type="number"
              value={neighborhoodSizeInput}
              onChange={(e) =>
                onNeighborhoodSizeInputChange(Number(e.target.value))
              }
              className="w-full px-2 py-1 text-lg font-semibold text-gray-900 border border-gray-300 rounded-md"
            />
          )}
        </div>
      </div>
    </div>
  );
};

ControlPanel.propTypes = {
  speed: PropTypes.number.isRequired,
  onSpeedChange: PropTypes.func.isRequired,
  isLearningRateVariable: PropTypes.bool.isRequired,
  onLearningRateVariableChange: PropTypes.func.isRequired,
  isNeighborhoodSizeVariable: PropTypes.bool.isRequired,
  onNeighborhoodSizeVariableChange: PropTypes.func.isRequired,
  inputSize: PropTypes.number.isRequired,
  onInputSizeChange: PropTypes.func.isRequired,
  dataSize: PropTypes.number.isRequired,
  onDataSizeChange: PropTypes.func.isRequired,
  learningRateInput: PropTypes.number.isRequired,
  onLearningRateInputChange: PropTypes.func.isRequired,
  neighborhoodSizeInput: PropTypes.number.isRequired,
  onNeighborhoodSizeInputChange: PropTypes.func.isRequired,
  currentLearningRate: PropTypes.number.isRequired,
  neighborhoodSize: PropTypes.number.isRequired,
};

export default memo(ControlPanel);
