import React from 'react';
import map from '../media/pictures/map.jpg';

import "./styles.css";

function Canvas(props) {
  return <img className={`map ${props.invisible ? "-invisible" : ""}`} src={map} alt="Map"/>;
}

export default Canvas;
