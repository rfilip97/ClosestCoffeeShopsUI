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
