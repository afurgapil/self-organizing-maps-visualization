import { memo, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 mb-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between mb-4 text-base sm:text-lg font-semibold text-gray-800 hover:text-gray-600 transition-colors"
      >
        <span>Control Panel</span>
        <svg
          className={`w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-200 ${
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
          isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Animation Speed
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="5"
                  value={speed}
                  onChange={(e) => onSpeedChange(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600 w-8">
                  {Math.round((speed / 90) * 100)}%
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  checked={isLearningRateVariable}
                  onChange={(e) =>
                    onLearningRateVariableChange(e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  Variable Learning Rate
                </label>
              </div>
              <div className="flex items-center gap-x-2">
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
              <div className="flex items-center gap-x-2">
                <input
                  type="number"
                  value={inputSize}
                  onChange={(e) => onInputSizeChange(Number(e.target.value))}
                  className="w-20 sm:w-24 px-2 py-1 text-base sm:text-lg font-semibold text-gray-900 border border-gray-300 rounded-md"
                />
                <label className="text-sm font-medium text-gray-700">
                  Weight Points Count
                </label>
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  type="number"
                  value={dataSize}
                  onChange={(e) => onDataSizeChange(Number(e.target.value))}
                  className="w-20 sm:w-24 px-2 py-1 text-base sm:text-lg font-semibold text-gray-900 border border-gray-300 rounded-md"
                />
                <label className="text-sm font-medium text-gray-700">
                  Data Points Count
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-2">Learning Rate</div>
              {isLearningRateVariable ? (
                <div className="text-base sm:text-lg font-semibold text-gray-900">
                  {currentLearningRate.toFixed(4)}
                </div>
              ) : (
                <input
                  type="number"
                  value={learningRateInput}
                  onChange={(e) =>
                    onLearningRateInputChange(Number(e.target.value))
                  }
                  className="w-full px-2 py-1 text-base sm:text-lg font-semibold text-gray-900 border border-gray-300 rounded-md"
                />
              )}
            </div>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-2">
                Neighborhood Size
              </div>
              {isNeighborhoodSizeVariable ? (
                <div className="text-base sm:text-lg font-semibold text-gray-900">
                  {neighborhoodSize.toFixed(2)}
                </div>
              ) : (
                <input
                  type="number"
                  value={neighborhoodSizeInput}
                  onChange={(e) =>
                    onNeighborhoodSizeInputChange(Number(e.target.value))
                  }
                  className="w-full px-2 py-1 text-base sm:text-lg font-semibold text-gray-900 border border-gray-300 rounded-md"
                />
              )}
            </div>
          </div>
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
