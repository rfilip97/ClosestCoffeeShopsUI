import sizes from "../scss/map/_mapConstants.scss";

const margin = viewportToPixels(sizes.mapMargin);
const mapX = viewportToPixels(sizes.mapWidth);
const mapY = viewportToPixels(sizes.mapHeight);

/**
 * Translate real coordinates to map coordinates
 * @param {Number} x X coordinate
 * @param {Number} y Y coordinate
 * @returns the translated values
 */
export function translateMapCoordinates(x, y) {
  const translate = (coord, mapSize) => {
    const normalisedCoord = Number(coord) + 180;
    return (normalisedCoord * mapSize) / 360;
  };

  return [translate(x, mapX), translate(y, mapY)];
}

/**
 * Translate map coordinates to real coordinates
 * @param {Number} x X coordinate
 * @param {Number} y Y coordinate
 * @returns the translated values
 */
export function reverseTranslateMapCoordinates(x, y) {
  const translate = (coord, mapSize) => {
    const normalisedCoord = coord - margin;
    const absval = (mapSize * normalisedCoord) / 360;
    return absval.toFixed(2);
  };

  return [translate(x, mapX), translate(y, mapY)];
}

export const translateMouseCoordsToMapCoords = (event) => {
  const x = event.clientX - event.target.offsetLeft;
  const y = event.clientY - event.target.offsetTop;

  const translate = (coord, mapSize) => {
    const normalisedCoord = coord - margin;
    const absVal = (360 * normalisedCoord) / mapSize;
    return (absVal - 180).toFixed(2);
  };

  return { x: translate(x, mapX), y: translate(y, mapY) };
};

export const translateMouseCoordsAndCall = (cb) => (event) => {
  const { x, y } = translateMouseCoordsToMapCoords(event);

  cb({ x, y });
};

function viewportToPixels(value) {
  var parts = value.match(/([0-9\.]+)(vh|vw)/);
  var q = Number(parts[1]);
  var side =
    window[["innerHeight", "innerWidth"][["vh", "vw"].indexOf(parts[2])]];
  return Math.round(side * (q / 100));
}
