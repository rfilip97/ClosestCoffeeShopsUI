import React from "react";
import map from "../media/pictures/map.jpg";

import "./styles.css";

function Map(props) {
  return (
    <div className="map-container" onMouseMove={props.onMouseMove}>
      <img
        className={`map ${props.invisible ? "-invisible" : ""}`}
        src={map}
        alt="Map"
      />
    </div>
  );
}

export default Map;
