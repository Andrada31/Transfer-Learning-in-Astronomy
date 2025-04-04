// Utility functions for generating simulated activation maps

// Generate a simulated activation map for a given convolutional layer
export function generateActivationMap(layer) {
  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return "/placeholder.svg?height=300&width=300";
  }

  ctx.fillStyle = "#f8f9fa";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  switch (layer) {
    case 1:
      drawEarlyLayerActivation(ctx, canvas.width, canvas.height);
      break;
    case 2:
      drawMidLowLayerActivation(ctx, canvas.width, canvas.height);
      break;
    case 3:
      drawMidLayerActivation(ctx, canvas.width, canvas.height);
      break;
    case 4:
      drawMidHighLayerActivation(ctx, canvas.width, canvas.height);
      break;
    case 5:
      drawHighLayerActivation(ctx, canvas.width, canvas.height);
      break;
    default:
      drawDefaultActivation(ctx, canvas.width, canvas.height);
  }

  drawGrid(ctx, canvas.width, canvas.height, layer);

  return canvas.toDataURL("image/png");
}

function drawEarlyLayerActivation(ctx, width, height) {
  const cellSize = 10;
  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      const value = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 0.5 + 0.5;
      const intensity = Math.floor(value * 255);
      ctx.fillStyle = `rgb(${intensity}, ${intensity / 2}, ${intensity / 3})`;
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  }
}

function drawMidLowLayerActivation(ctx, width, height) {
  const cellSize = 15;
  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      const value = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 0.5 + 0.5;
      const intensity = Math.floor(value * 255);
      ctx.fillStyle = `rgb(${intensity / 3}, ${intensity}, ${intensity / 2})`;
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  }
}

function drawMidLayerActivation(ctx, width, height) {
  const cellSize = 20;
  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      const value = Math.sin(x * 0.08 + y * 0.05) * Math.cos(y * 0.08) * 0.5 + 0.5;
      const intensity = Math.floor(value * 255);
      ctx.fillStyle = `rgb(${intensity / 2}, ${intensity / 2}, ${intensity})`;
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  }
}

function drawMidHighLayerActivation(ctx, width, height) {
  const cellSize = 25;
  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      const value = Math.sin(x * 0.05 + y * 0.03) * Math.cos(y * 0.06 + x * 0.04) * 0.5 + 0.5;
      const intensity = Math.floor(value * 255);
      ctx.fillStyle = `rgb(${intensity / 4}, ${intensity}, ${intensity / 4})`;
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  }
}

function drawHighLayerActivation(ctx, width, height) {
  const cellSize = 30;
  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      const value = Math.sin(x * 0.03 + y * 0.02) * Math.cos(y * 0.04 + x * 0.03) * 0.5 + 0.5;
      const intensity = Math.floor(value * 255);
      ctx.fillStyle = `rgb(${intensity}, ${intensity / 1.5}, ${intensity / 4})`;
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  }
}

function drawDefaultActivation(ctx, width, height) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(255, 0, 0, 0.5)");
  gradient.addColorStop(0.5, "rgba(0, 255, 0, 0.5)");
  gradient.addColorStop(1, "rgba(0, 0, 255, 0.5)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawGrid(ctx, width, height, layer) {
  const gridSize = 10 + layer * 5;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 0.5;

  for (let x = 0; x <= width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}
