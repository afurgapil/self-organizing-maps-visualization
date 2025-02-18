import { memo } from "react";
import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Grid,
  Html,
  Line,
} from "@react-three/drei";
import * as THREE from "three";

const DataPoint = ({ position, color, opacity }) => (
  <mesh position={position}>
    <sphereGeometry args={[0.1, 16, 16]} />
    <meshStandardMaterial color={color} transparent opacity={opacity} />
  </mesh>
);

DataPoint.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
};

const WeightPoint = ({ position, color }) => (
  <mesh position={position}>
    <boxGeometry args={[0.2, 0.2, 0.2]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

WeightPoint.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired,
};

const ThreeDimensionalPlot = ({
  dataPoints,
  weights,
  dataColor,
  weightColor,
  opacity,
  showGrid = true,
  showAxes = true,
  showConnections = true,
}) => {
  // Create connections between adjacent weight points
  const createConnections = () => {
    if (!showConnections || !weights || weights.length === 0) return null;

    const gridSize = Math.ceil(Math.sqrt(weights.length));
    const lines = [];

    // Horizontal connections
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize - 1; j++) {
        const idx1 = i * gridSize + j;
        const idx2 = i * gridSize + j + 1;
        if (idx1 < weights.length && idx2 < weights.length) {
          const points = [
            new THREE.Vector3(
              weights[idx1].x,
              weights[idx1].y,
              weights[idx1].z
            ),
            new THREE.Vector3(
              weights[idx2].x,
              weights[idx2].y,
              weights[idx2].z
            ),
          ];
          lines.push(points);
        }
      }
    }

    // Vertical connections
    for (let i = 0; i < gridSize - 1; i++) {
      for (let j = 0; j < gridSize; j++) {
        const idx1 = i * gridSize + j;
        const idx2 = (i + 1) * gridSize + j;
        if (idx1 < weights.length && idx2 < weights.length) {
          const points = [
            new THREE.Vector3(
              weights[idx1].x,
              weights[idx1].y,
              weights[idx1].z
            ),
            new THREE.Vector3(
              weights[idx2].x,
              weights[idx2].y,
              weights[idx2].z
            ),
          ];
          lines.push(points);
        }
      }
    }

    return lines.map((points, index) => (
      <Line key={index} points={points} color={weightColor} lineWidth={1} />
    ));
  };

  return (
    <div className="w-full h-[600px] bg-white dark:bg-gray-800 rounded-lg">
      <Canvas>
        <PerspectiveCamera makeDefault position={[15, 15, 15]} />
        <OrbitControls enableDamping dampingFactor={0.05} />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />

        {showGrid && (
          <>
            <Grid
              position={[0, -8, 0]}
              args={[32, 32]}
              cellSize={1}
              cellThickness={0.5}
              cellColor="#6b7280"
              sectionSize={4}
              sectionThickness={1}
              sectionColor="#4b5563"
              fadeDistance={30}
              fadeStrength={1}
            />
            <Grid
              rotation={[Math.PI / 2, 0, 0]}
              position={[-8, 0, 0]}
              args={[32, 32]}
              cellSize={1}
              cellThickness={0.5}
              cellColor="#6b7280"
              sectionSize={4}
              sectionThickness={1}
              sectionColor="#4b5563"
              fadeDistance={30}
              fadeStrength={1}
            />
            <Grid
              rotation={[0, Math.PI / 2, 0]}
              position={[0, 0, -8]}
              args={[32, 32]}
              cellSize={1}
              cellThickness={0.5}
              cellColor="#6b7280"
              sectionSize={4}
              sectionThickness={1}
              sectionColor="#4b5563"
              fadeDistance={30}
              fadeStrength={1}
            />
          </>
        )}

        {showAxes && (
          <>
            <Line
              points={[
                [-8, 0, 0],
                [8, 0, 0],
              ]}
              color="red"
              lineWidth={2}
            />
            <Line
              points={[
                [0, -8, 0],
                [0, 8, 0],
              ]}
              color="green"
              lineWidth={2}
            />
            <Line
              points={[
                [0, 0, -8],
                [0, 0, 8],
              ]}
              color="blue"
              lineWidth={2}
            />
            <Html position={[8.5, 0, 0]}>
              <div className="text-red-500">X</div>
            </Html>
            <Html position={[0, 8.5, 0]}>
              <div className="text-green-500">Y</div>
            </Html>
            <Html position={[0, 0, 8.5]}>
              <div className="text-blue-500">Z</div>
            </Html>
          </>
        )}

        {dataPoints?.map((point, index) => (
          <DataPoint
            key={`data-${index}`}
            position={[point.x, point.y, point.z]}
            color={dataColor}
            opacity={opacity}
          />
        ))}

        {weights?.map((weight, index) => (
          <WeightPoint
            key={`weight-${index}`}
            position={[weight.x, weight.y, weight.z]}
            color={weightColor}
          />
        ))}

        {createConnections()}
      </Canvas>
    </div>
  );
};

ThreeDimensionalPlot.propTypes = {
  dataPoints: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      z: PropTypes.number.isRequired,
    })
  ).isRequired,
  weights: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      z: PropTypes.number.isRequired,
    })
  ).isRequired,
  dataColor: PropTypes.string.isRequired,
  weightColor: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  showGrid: PropTypes.bool,
  showAxes: PropTypes.bool,
  showConnections: PropTypes.bool,
};

export default memo(ThreeDimensionalPlot);
