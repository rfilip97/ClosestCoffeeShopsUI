import pointerImg from "../media/pictures/x.png";
import { translateMapCoordinates } from "../utils/CoordinateConverter";

import "./styles.css";

function Pointer(props) {
  const shopSizePx = 50;
  const [newx, newy] = translateMapCoordinates(props.x, props.y);
  const initialStyle = {
    top: `${newy}px`,
    left: `${newx}px`,
    height: `${shopSizePx}px`,
    width: `${shopSizePx}px`,
  };

  return (
    <img
      src={pointerImg}
      className="pointer"
      alt="Pointer"
      style={initialStyle}
    ></img>
  );
}

export default Pointer;
