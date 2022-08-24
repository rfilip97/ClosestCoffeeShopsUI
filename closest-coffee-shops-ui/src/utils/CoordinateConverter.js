/**
 * Translate real coordinates to map coordinates
 * @param {Number} x X coordinate
 * @param {Number} y Y coordinate
 * @returns the translated values
 */
export function translateMapCoordinates(x, y) {
  const translateCoord = (coord) => {
    return (parseInt(coord) + 180) * 10;
  };

  return [translateCoord(x), translateCoord(y)];
}

/**
 * Translate map coordinates to real coordinates
 * @param {Number} x X coordinate
 * @param {Number} y Y coordinate
 * @returns the translated values
 */
export function reverseTranslateMapCoordinates(x, y) {
  const revTranslateX = (coord) => {
    return (parseInt(coord) / 10 - 180).toFixed(2);
  };

  const revTranslateY = (coord) => {
    return (parseInt(coord) / 10 - 180).toFixed(2);
  };

  return [revTranslateX(x), revTranslateY(y)];
}

export const translateMouseCoordsToMapCoords = (event) => {
  const absX = event.clientX - event.target.offsetLeft;
  const absY = event.clientY - event.target.offsetTop;

  const [x, y] = reverseTranslateMapCoordinates(absX, absY);

  return { x, y };
};

export const translateMouseCoordsAndCall = (cb) => (event) => {
  const { x, y } = translateMouseCoordsToMapCoords(event);

  cb({ x, y });
};
