import sizes from "../scss/map/_mapConstants.scss";

const viewportToPixels = (value) => {
  var parts = value.match(/([0-9\.]+)(vh|vw)/);
  var q = Number(parts[1]);
  var side =
    window[["innerHeight", "innerWidth"][["vh", "vw"].indexOf(parts[2])]];
  return Math.round(side * (q / 100));
};

export const getEnvironment = () => {
  const mapImage = document.getElementById("mapimage");

  if (mapImage) {
    const dims = mapImage.getBoundingClientRect();

    return {
      margin: dims.top,
      mapX: dims.width,
      mapY: dims.height,
    };
  }

  return {
    margin: 0,
    mapX: 0,
    mapY: 0,
  };
};
