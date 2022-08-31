export const pointsContainer = () => {
  let points = [];

  const addPoints = (ax, ay) => (bx, by) => {
    if (!bx) {
      return ax, ay;
    }

    if (points.length === 0) {
      points = [{ x: ax, y: ay }];
    }

    points = [...points, { x: bx, y: by }];
    return addPoints(bx, by);
  };

  const getPoints = () => points;

  return { addPoints, getPoints };
};
