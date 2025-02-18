import { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";

const predefinedPalettes = {
  default: {
    dataPoints: "#000000",
    weights: "#ef4444",
    opacity: 0.6,
  },
  ocean: {
    dataPoints: "#0ea5e9",
    weights: "#0369a1",
    opacity: 0.7,
  },
  forest: {
    dataPoints: "#22c55e",
    weights: "#15803d",
    opacity: 0.7,
  },
  sunset: {
    dataPoints: "#f59e0b",
    weights: "#b45309",
    opacity: 0.7,
  },
  purple: {
    dataPoints: "#a855f7",
    weights: "#7e22ce",
    opacity: 0.7,
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
    dataPoints: "#000000",
    weights: "#ef4444",
    opacity: 0.6,
  },
};

const ColorPicker = ({
  selectedPalette,
  onPaletteChange,
  customColors,
  onCustomColorChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (selectedPalette !== "custom") {
      onCustomColorChange(predefinedPalettes[selectedPalette]);
    }
  }, [selectedPalette, onCustomColorChange]);

  const handleColorChange = (key, value) => {
    onCustomColorChange({
      ...customColors,
      [key]: value,
    });
    onPaletteChange("custom");
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between mb-4 text-lg font-semibold text-gray-800 hover:text-gray-600 transition-colors"
      >
        <span>Color Settings</span>
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color Palette
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {Object.entries(predefinedPalettes).map(([name, colors]) => (
              <button
                key={name}
                onClick={() => onPaletteChange(name)}
                className={`flex flex-col items-center p-2 rounded border ${
                  selectedPalette === name
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex gap-1 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors.dataPoints }}
                  />
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors.weights }}
                  />
                </div>
                <span className="text-xs capitalize">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedPalette === "custom" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Points Color
                </label>
                <input
                  type="color"
                  value={customColors.dataPoints}
                  onChange={(e) =>
                    handleColorChange("dataPoints", e.target.value)
                  }
                  className="w-full h-10 p-1 rounded border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weights Color
                </label>
                <input
                  type="color"
                  value={customColors.weights}
                  onChange={(e) => handleColorChange("weights", e.target.value)}
                  className="w-full h-10 p-1 rounded border border-gray-300"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opacity
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={customColors.opacity}
                  onChange={(e) =>
                    handleColorChange("opacity", Number(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {Math.round(customColors.opacity * 100)}%
                </div>
              </div>
            </div>
          </div>
        )}
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
  }).isRequired,
  onCustomColorChange: PropTypes.func.isRequired,
};

export default memo(ColorPicker);
