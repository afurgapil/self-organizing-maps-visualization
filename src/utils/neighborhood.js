export const neighborhood = (distance, sigma = 1.0) => {
  return Math.exp(-(distance * distance) / (2 * sigma * sigma));
};
