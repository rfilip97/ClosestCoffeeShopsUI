export const roundToDecimals = (a, b) => {
  const factor = Math.pow(10, b);

  return Math.round(a * factor) / factor;
};

export const squareOfDifference = (a, b) => Math.pow(a - b, 2);
