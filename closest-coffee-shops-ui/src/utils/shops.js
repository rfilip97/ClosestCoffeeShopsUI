import { NUMBER_OF_SHOPS_TO_HIGHLIGHT } from "../services/closestCoffeeShops/utils/config";

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
