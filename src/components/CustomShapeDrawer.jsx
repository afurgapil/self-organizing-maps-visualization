import { memo, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const CustomShapeDrawer = ({ onPointsChange, customColors }) => {
  const [points, setPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const lastPointRef = useRef(null);

  const addPoint = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 16 - 8;
    const y = (1 - (e.clientY - rect.top) / rect.height) * 16 - 8;

    if (lastPointRef.current) {
      const dx = x - lastPointRef.current.x;
      const dy = y - lastPointRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 0.2) return;
    }

    const newPoint = { x, y, label: 0 };
    lastPointRef.current = newPoint;
    const newPoints = [...points, newPoint];
    setPoints(newPoints);
    onPointsChange(newPoints);
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    lastPointRef.current = null;
    addPoint(e);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    addPoint(e);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    lastPointRef.current = null;
  };

  const clearPoints = () => {
    setIsDrawing(false);
    lastPointRef.current = null;
    const emptyPoints = [];
    setPoints(emptyPoints);
    onPointsChange(emptyPoints);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#e5e7eb";
    ctx.beginPath();
    for (let i = 0; i <= 16; i++) {
      const x = (i / 16) * canvas.width;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      const y = (i / 16) * canvas.height;
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();

    ctx.strokeStyle = "#9ca3af";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    points.forEach((point) => {
      const canvasX = ((point.x + 8) / 16) * canvas.width;
      const canvasY = (1 - (point.y + 8) / 16) * canvas.height;

      ctx.fillStyle = customColors.dataPoints;
      ctx.globalAlpha = customColors.opacity;
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }, [points, customColors]);

  useEffect(() => {
    const handleMouseUpOutside = () => {
      setIsDrawing(false);
      lastPointRef.current = null;
    };

    window.addEventListener("mouseup", handleMouseUpOutside);
    return () => {
      window.removeEventListener("mouseup", handleMouseUpOutside);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Custom Shape</h3>
        <button
          onClick={clearPoints}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear
        </button>
      </div>
      <div
        ref={containerRef}
        className="relative w-full h-[300px] border border-gray-300 rounded"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="absolute inset-0 cursor-crosshair"
        />
      </div>
      <p className="text-sm text-gray-600">
        Click and drag to draw points. The points will be used as training data.
      </p>
    </div>
  );
};

CustomShapeDrawer.propTypes = {
  onPointsChange: PropTypes.func.isRequired,
  customColors: PropTypes.shape({
    dataPoints: PropTypes.string.isRequired,
    weights: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
  }).isRequired,
};

export default memo(CustomShapeDrawer);
