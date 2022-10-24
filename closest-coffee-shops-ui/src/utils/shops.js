import { NUMBER_OF_SHOPS_TO_HIGHLIGHT } from "../services/closestCoffeeShops/utils/config";
import { roundToDecimals, squareOfDifference } from "./math.js";

export const getHighlightedShops = (shops, point) => {
  if (Array.isArray(shops)) {
    const cshops = shops.map((item, index) => {
      const highlighted = point && index < NUMBER_OF_SHOPS_TO_HIGHLIGHT;

      return {
        ...item,
        highlighted,
      };
    });

    return cshops;
  }
};

export const getClosestCoffeShops = (coffeeShops, position, limit) => {
  if (coffeeShops.length > 0) {
    const sortedShops = coffeeShops
    .map((cs) => ({
      ...cs,
      delta: calculateDelta(cs, position),
    }))
    .sort((cs1, cs2) => cs1.delta - cs2.delta);

  return typeof limit === "number" ? sortedShops.slice(0, limit) : sortedShops;
  }

  return coffeeShops;
};

export const getHighlightedSortedShopsRelativeTo = (point, shops) => {
  return getHighlightedShops(getClosestCoffeShops(shops, point), point);
};

const calculateDelta = (coffeeShop, currentPosition) => {
  const delta = Math.sqrt(
    squareOfDifference(coffeeShop.x, currentPosition.x) +
      squareOfDifference(coffeeShop.y, currentPosition.y)
  );

  return roundToDecimals(delta, 4);
};
