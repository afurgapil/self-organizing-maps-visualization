import { useState, useRef, useEffect } from "react";

const GridIntensitySOM = () => {
  const [image, setImage] = useState(null);
  const canvasRef = useRef(null);
  const GRID_SIZE = 20;
  const DELAY = 50;

  let iterationIndex = 0;
  let intervalId;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const calculateGridIntensities = (ctx, imgElement) => {
    const cellWidth = imgElement.width / GRID_SIZE;
    const cellHeight = imgElement.height / GRID_SIZE;
    let gridIntensities = [];

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const x = i * cellWidth;
        const y = j * cellHeight;

        const cellData = ctx.getImageData(x, y, cellWidth, cellHeight).data;
        let totalIntensity = 0;

        for (let k = 0; k < cellData.length; k += 4) {
          const grayValue =
            (cellData[k] + cellData[k + 1] + cellData[k + 2]) / 3;
          totalIntensity += grayValue;
        }

        const avgIntensity = totalIntensity / (cellData.length / 4);
        gridIntensities.push({ x, y, avgIntensity });
      }
    }

    intervalId = setInterval(() => {
      if (iterationIndex >= gridIntensities.length) {
        clearInterval(intervalId);
        return;
      }

      const cell = gridIntensities[iterationIndex];
      ctx.fillStyle = `rgb(${cell.avgIntensity}, ${cell.avgIntensity}, ${cell.avgIntensity})`;
      ctx.fillRect(cell.x, cell.y, cellWidth, cellHeight);
      ctx.strokeStyle = "rgba(0,0,0,0.1)";
      ctx.strokeRect(cell.x, cell.y, cellWidth, cellHeight);

      iterationIndex++;
    }, DELAY);
  };

  useEffect(() => {
    if (image) {
      const imgElement = new Image();
      imgElement.src = image;
      imgElement.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        ctx.drawImage(imgElement, 0, 0);

        calculateGridIntensities(ctx, imgElement);
      };
    }

    return () => clearInterval(intervalId);
  }, [image]);

  return (
    <div>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        style={{ border: "1px solid black", marginTop: "10px" }}
      ></canvas>
    </div>
  );
};

export default GridIntensitySOM;
