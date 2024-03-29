import React from "react";
import map from "../media/pictures/map.jpg";

import "../scss/map/_map.scss";

function Map(props) {
  return (
    <div className="map-container" onMouseMove={props.onMouseMove}>
      <img
        id="mapimage"
        className={`map`}
        src={map}
        alt="Map"
        onClick={props.onClick}
        data-testid="mapimg"
      />
      {props.children}
    </div>
  );
}

export default Map;
