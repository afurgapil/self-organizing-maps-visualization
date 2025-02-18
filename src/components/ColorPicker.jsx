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
};

const ColorPicker = ({
  selectedPalette,
  onPaletteChange,
  customColors,
  onCustomColorChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Seçilen paletin renklerini customColors'a uygula
    const selectedColors = predefinedPalettes[selectedPalette];
    if (selectedColors) {
      onCustomColorChange(selectedColors);
    }
  }, [selectedPalette, onCustomColorChange]);

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
        {/* Predefined Palettes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color Palette
          </label>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(predefinedPalettes).map(([name, colors]) => (
              <button
                key={name}
                onClick={() => onPaletteChange(name)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm
                  ${
                    selectedPalette === name
                      ? "ring-2 ring-blue-500 ring-offset-2"
                      : "hover:bg-gray-100"
                  }`}
              >
                <div className="flex gap-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors.dataPoints }}
                  />
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors.weights }}
                  />
                </div>
                <span className="capitalize">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Points Color
            </label>
            <input
              type="color"
              value={customColors.dataPoints}
              onChange={(e) =>
                onCustomColorChange({
                  ...customColors,
                  dataPoints: e.target.value,
                })
              }
              className="h-8 w-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weights Color
            </label>
            <input
              type="color"
              value={customColors.weights}
              onChange={(e) =>
                onCustomColorChange({
                  ...customColors,
                  weights: e.target.value,
                })
              }
              className="h-8 w-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opacity
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={customColors.opacity * 100}
              onChange={(e) =>
                onCustomColorChange({
                  ...customColors,
                  opacity: Number(e.target.value) / 100,
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-500">
              {Math.round(customColors.opacity * 100)}%
            </span>
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
  }).isRequired,
  onCustomColorChange: PropTypes.func.isRequired,
};

export default memo(ColorPicker);
