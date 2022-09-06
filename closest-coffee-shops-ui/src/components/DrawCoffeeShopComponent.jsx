import coffeeShopImg from "../media/pictures/cshop.png";
import { translateMapCoordinates } from "../utils/coordinates";
import { ReactTooltipStyled } from "./ReactTooltipStyled";
import { pointPxToPercent } from "../utils/coordinates";

import "../scss/shop/_shop.scss";

export function CoffeeShop(props) {
  const [newx, newy] = translateMapCoordinates(props.shop.x, props.shop.y);
  const [percentX, percentY] = pointPxToPercent({ x: newx, y: newy });

  const elementStyle = {
    top: `${percentY}%`,
    left: `${percentX}%`,
  };

  const preventEvent = (e) => {
    e.stopPropagation();
  };

  return (
    <div onMouseMove={preventEvent}>
      <img
        src={coffeeShopImg}
        className={`shop ${props.shop.highlighted ? "-highlighted" : ""}`}
        alt="Coffee shop"
        style={elementStyle}
        data-tip={props.shop.name}
        data-testid="coffeeshopimg"
      />
      <ReactTooltipStyled className="shop-tooltip" />
    </div>
  );
}
