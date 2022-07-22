import coffeeShopImg from '../media/pictures/cshop.png';
import { translateMapCoordinates } from '../utils/CoordinateConverter';

import "./styles.css";

function CoffeeShop(props) {
    const shopSizePx = 50;
    const [newx, newy] = translateMapCoordinates(props.x, props.y);
    const initialStyle = { top: `${newy}px`, left: `${newx}px`, height: `${shopSizePx}px`, width: `${shopSizePx}px` };
    return (
        <img src={coffeeShopImg}
            className={`Shop ${props.highlighted ? "-Highlighted" : ""}`}
            alt="Coffee shop"
            style={initialStyle}>
        </img>)
}

export default CoffeeShop;
