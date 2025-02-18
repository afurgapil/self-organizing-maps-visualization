import { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";

const predefinedPalettes = {
  default: {
    light: {
      dataPoints: "#000000",
      weights: "#ef4444",
      opacity: 0.6,
    },
    dark: {
      dataPoints: "#ffffff",
      weights: "#f87171",
      opacity: 0.7,
    },
  },
  ocean: {
    light: {
      dataPoints: "#0ea5e9",
      weights: "#0369a1",
      opacity: 0.7,
    },
    dark: {
      dataPoints: "#38bdf8",
      weights: "#0ea5e9",
      opacity: 0.8,
    },
  },
  forest: {
    light: {
      dataPoints: "#22c55e",
      weights: "#15803d",
      opacity: 0.7,
    },
    dark: {
      dataPoints: "#4ade80",
      weights: "#22c55e",
      opacity: 0.8,
    },
  },
  sunset: {
    light: {
      dataPoints: "#f59e0b",
      weights: "#b45309",
      opacity: 0.7,
    },
    dark: {
      dataPoints: "#fbbf24",
      weights: "#f59e0b",
      opacity: 0.8,
    },
  },
  purple: {
    light: {
      dataPoints: "#a855f7",
      weights: "#7e22ce",
      opacity: 0.7,
    },
    dark: {
      dataPoints: "#c084fc",
      weights: "#a855f7",
      opacity: 0.8,
    },
  },
  neon: {
    dataPoints: "#f0abfc",
    weights: "#db2777",
    opacity: 0.7,
  },
  earth: {
    dataPoints: "#78350f",
    weights: "#a16207",
    opacity: 0.7,
  },
  night: {
    dataPoints: "#1e293b",
    weights: "#475569",
    opacity: 0.7,
  },
  candy: {
    dataPoints: "#ec4899",
    weights: "#be185d",
    opacity: 0.7,
  },
  nature: {
    dataPoints: "#65a30d",
    weights: "#166534",
    opacity: 0.7,
  },
  fire: {
    dataPoints: "#dc2626",
    weights: "#991b1b",
    opacity: 0.7,
  },
  custom: {
    light: {
      dataPoints: "#000000",
      weights: "#ef4444",
      opacity: 0.6,
    },
    dark: {
      dataPoints: "#ffffff",
      weights: "#f87171",
      opacity: 0.7,
    },
  },
};

const ColorPicker = ({
  selectedPalette,
  onPaletteChange,
  customColors,
  onCustomColorChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    if (selectedPalette !== "custom") {
      onCustomColorChange(predefinedPalettes[selectedPalette][theme]);
    }
  }, [selectedPalette, theme, onCustomColorChange]);

  const handleColorChange = (key, value) => {
    onCustomColorChange({
      ...customColors,
      [key]: value,
    });
    onPaletteChange("custom");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 mb-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between mb-4 text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <span>Color Settings</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Weight Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customColors.weights}
                  onChange={(e) => handleColorChange("weights", e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={customColors.weights}
                  onChange={(e) => handleColorChange("weights", e.target.value)}
                  className="flex-1 px-2 py-1 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customColors.dataPoints}
                  onChange={(e) =>
                    handleColorChange("dataPoints", e.target.value)
                  }
                  className="w-8 h-8 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={customColors.dataPoints}
                  onChange={(e) =>
                    handleColorChange("dataPoints", e.target.value)
                  }
                  className="flex-1 px-2 py-1 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Opacity
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={customColors.opacity}
                  onChange={(e) =>
                    handleColorChange("opacity", Number(e.target.value))
                  }
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                  {Math.round(customColors.opacity * 100)}%
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Weight Size
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={customColors.weightsSize}
                  onChange={(e) =>
                    handleColorChange("weightsSize", Number(e.target.value))
                  }
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                  {customColors.weightsSize}px
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data Size
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={customColors.dataPointsSize}
                  onChange={(e) =>
                    handleColorChange("dataPointsSize", Number(e.target.value))
                  }
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                  {customColors.dataPointsSize}px
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Line Width
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={customColors.lineWidth}
                  onChange={(e) =>
                    handleColorChange("lineWidth", Number(e.target.value))
                  }
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                  {customColors.lineWidth}px
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ColorPicker.propTypes = {
  selectedPalette: PropTypes.string.isRequired,
  onPaletteChange: PropTypes.func.isRequired,
  customColors: PropTypes.shape({
    dataPoints: PropTypes.string.isRequired,
    weights: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    weightsSize: PropTypes.number.isRequired,
    dataPointsSize: PropTypes.number.isRequired,
    lineWidth: PropTypes.number.isRequired,
  }).isRequired,
  onCustomColorChange: PropTypes.func.isRequired,
};

export default memo(ColorPicker);
