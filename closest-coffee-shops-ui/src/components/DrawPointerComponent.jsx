import pointerImg from "../media/pictures/x.png";
import {
  pointPxToPercent,
  translateMapCoordinates,
} from "../utils/coordinates";

import "../scss/pointer/_pointer.scss";

export function Pointer(props) {
  const [newx, newy] = translateMapCoordinates(props.x, props.y);
  const [percentX, percentY] = pointPxToPercent({ x: newx, y: newy });

  const initialStyle = {
    top: `${percentY}%`,
    left: `${percentX}%`,
  };

  return (
    <img
      src={pointerImg}
      className="pointer"
      alt="Pointer"
      style={initialStyle}
      data-testid="pointerimg"
    ></img>
  );
}

export default Pointer;
