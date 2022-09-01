import { getEnvironment } from "./environment";

/**
 * Translate real coordinates to map coordinates
 * @param {Number} x X coordinate
 * @param {Number} y Y coordinate
 * @returns the translated values
 */
export function translateMapCoordinates(x, y) {
  const env = getEnvironment();

  const translate = (coord, mapSize) => {
    const normalisedCoord = Number(coord) + 180;
    return (normalisedCoord * mapSize) / 360;
  };

  return [translate(x, env.mapX), translate(y, env.mapY)];
}

/**
 * Translate map coordinates to real coordinates
 * @param {Number} x X coordinate
 * @param {Number} y Y coordinate
 * @returns the translated values
 */
export function reverseTranslateMapCoordinates(x, y) {
  const env = getEnvironment();

  const translate = (coord, mapSize) => {
    const normalisedCoord = coord - env.margin;
    const absval = (mapSize * normalisedCoord) / 360;
    return absval.toFixed(2);
  };

  return [translate(x, env.mapX), translate(y, env.mapY)];
}

export const translateMouseCoordsToMapCoords = (event) => {
  const env = getEnvironment();

  const x = event.clientX - event.target.offsetLeft;
  const y = event.clientY - event.target.offsetTop;

  const translate = (coord, mapSize) => {
    const normalisedCoord = coord - env.margin;
    const absVal = (360 * normalisedCoord) / mapSize;
    return (absVal - 180).toFixed(2);
  };

  return { x: translate(x, env.mapX), y: translate(y, env.mapY) };
};

export const translateMouseCoordsAndCall = (cb) => (event) => {
  const { x, y } = translateMouseCoordsToMapCoords(event);

  cb({ x, y });
};
