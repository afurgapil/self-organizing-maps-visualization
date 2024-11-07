export const learningRate = (s, k = -1 / 1000) => {
  return Math.exp(s * k);
};
