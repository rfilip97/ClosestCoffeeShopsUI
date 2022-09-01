import coffeeShopImg from "../media/pictures/cshop.png";
import { translateMapCoordinates } from "../utils/coordinates";
import { ReactTooltipStyled } from "./ReactTooltipStyled";

import "../scss/shop/_shop.scss";

export function CoffeeShop(props) {
  const shopSizePx = 50;
  const [newx, newy] = translateMapCoordinates(props.shop.x, props.shop.y);

  const elementStyle = {
    top: `${newy}px`,
    left: `${newx}px`,
    height: `${shopSizePx}px`,
    width: `${shopSizePx}px`,
  };

  return (
    <div>
      <img
        src={coffeeShopImg}
        className={`shop ${props.shop.highlighted ? "-highlighted" : ""}`}
        alt="Coffee shop"
        style={elementStyle}
        data-tip={props.shop.name}
      />
      <ReactTooltipStyled className="shop-tooltip" />
    </div>
  );
}