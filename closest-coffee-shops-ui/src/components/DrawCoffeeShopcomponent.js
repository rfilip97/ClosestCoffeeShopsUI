import coffeeShopImg from "../media/pictures/cshop.png";
import { translateMapCoordinates } from "../utils/CoordinateConverter";

import "./styles.css";

function CoffeeShop(props) {
  const shopSizePx = 50;
  const [newx, newy] = translateMapCoordinates(props.shop.x, props.shop.y);
  const elementStyle = {
    top: `${newy}px`,
    left: `${newx}px`,
    height: `${shopSizePx}px`,
    width: `${shopSizePx}px`,
  };
  return (
    <img
      src={coffeeShopImg}
      className={`shop ${props.shop.highlighted ? "-highlighted" : ""}`}
      alt="Coffee shop"
      style={elementStyle}
    ></img>
  );
}

export default CoffeeShop;
