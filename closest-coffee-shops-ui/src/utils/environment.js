import sizes from "../scss/map/_mapConstants.scss";

const viewportToPixels = (value) => {
  var parts = value.match(/([0-9\.]+)(vh|vw)/);
  var q = Number(parts[1]);
  var side =
    window[["innerHeight", "innerWidth"][["vh", "vw"].indexOf(parts[2])]];
  return Math.round(side * (q / 100));
};

export const getEnvironment = () => {
  return {
    margin: viewportToPixels(sizes.mapMargin),
    mapX: viewportToPixels(sizes.mapWidth),
    mapY: viewportToPixels(sizes.mapHeight),
  };
};
