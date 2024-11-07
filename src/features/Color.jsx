import { useState, useEffect, useRef, useCallback } from "react";

const ColorQuantization = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [quantizedImage, setQuantizedImage] = useState(null);
  const [numColors, setNumColors] = useState(8);
  const [iteration, setIteration] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const canvasRef = useRef(null);
  const [colorData, setColorData] = useState([]);
  const [weights, setWeights] = useState([]);

  const loadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const startTraining = () => {
    if (!imageUrl) return;

    setIsTraining(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const colors = extractColors(imageData.data);

      const initialWeights = [];
      for (let i = 0; i < numColors; i++) {
        initialWeights.push([
          Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256),
          Math.floor(Math.random() * 256),
        ]);
      }

      setWeights(initialWeights);
      setColorData(colors);
      trainSOM(colors, initialWeights);
    };
    img.src = imageUrl;
  };

  const trainSOM = (colors, initialWeights) => {
    let currentWeights = [...initialWeights];
    let currentIteration = 0;

    const trainStep = () => {
      if (!isTraining || currentIteration >= 100) {
        applySOM(colors, currentWeights);
        return;
      }

      const learningRate = 0.1 * Math.exp(-currentIteration / 100);
      const randomIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomIndex];

      let bmuIndex = 0;
      let minDist = Infinity;
      for (let i = 0; i < currentWeights.length; i++) {
        const dist = colorDistance(randomColor, currentWeights[i]);
        if (dist < minDist) {
          minDist = dist;
          bmuIndex = i;
        }
      }

      const sigma = 2 * Math.exp(-currentIteration / 100);

      for (let i = 0; i < currentWeights.length; i++) {
        const dist = Math.abs(i - bmuIndex);
        const neighborhoodEffect = Math.exp(
          -(dist * dist) / (2 * sigma * sigma)
        );

        currentWeights[i] = currentWeights[i].map(
          (val, j) =>
            val + learningRate * neighborhoodEffect * (randomColor[j] - val)
        );
      }

      setWeights([...currentWeights]);
      setIteration(currentIteration);

      currentIteration++;
      setTimeout(trainStep, 0);
    };

    setTimeout(trainStep, 0);
  };

  const applySOM = (colors, finalWeights) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    applyQuantizedColors(
      colors,
      imgData.data,
      finalWeights,
      canvas.width,
      canvas.height
    );

    ctx.putImageData(imgData, 0, 0);
    setQuantizedImage(canvas.toDataURL());
    setIsTraining(false);
  };

  const extractColors = (pixels) => {
    const colors = [];
    for (let i = 0; i < pixels.length; i += 4) {
      colors.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
    }
    return colors;
  };

  const colorDistance = (c1, c2) => {
    return Math.sqrt(
      Math.pow(c1[0] - c2[0], 2) +
        Math.pow(c1[1] - c2[1], 2) +
        Math.pow(c1[2] - c2[2], 2)
    );
  };

  const applyQuantizedColors = (
    originalColors,
    imageData,
    colorMap,
    width,
    height
  ) => {
    for (let i = 0; i < originalColors.length; i++) {
      const closestColor = findClosestColor(originalColors[i], colorMap);
      const index = i * 4;

      imageData[index] = closestColor[0];
      imageData[index + 1] = closestColor[1];
      imageData[index + 2] = closestColor[2];
      imageData[index + 3] = 255;
    }
  };

  const findClosestColor = (pixel, colorMap) => {
    let minDist = Infinity;
    let closestColor = null;

    for (const color of colorMap) {
      const dist = colorDistance(pixel, color);
      if (dist < minDist) {
        minDist = dist;
        closestColor = color;
      }
    }
    return closestColor;
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={loadImage} />
      <br />
      Number of Colors:{" "}
      <input
        type="number"
        value={numColors}
        onChange={(e) => setNumColors(parseInt(e.target.value, 10))}
        min="2"
        max="256"
      />
      <button onClick={startTraining} disabled={!imageUrl}>
        {isTraining ? "Stop Training" : "Start Training"}
      </button>
      <br />
      {imageUrl && <img src={imageUrl} alt="Original" />}
      {quantizedImage && <img src={quantizedImage} alt="Quantized" />}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <div>Iteration: {iteration}</div>
      <div>
        {weights.map((color, index) => (
          <div
            key={index}
            style={{
              width: 20,
              height: 20,
              backgroundColor: `rgb(${color.map(Math.round)})`,
              display: "inline-block",
              marginRight: 4,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorQuantization;
