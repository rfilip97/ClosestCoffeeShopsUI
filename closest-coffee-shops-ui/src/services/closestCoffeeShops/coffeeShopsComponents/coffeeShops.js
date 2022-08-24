import { roundToDecimals, squareOfDifference } from "../../../utils/math.js";
import fetchCoffeeShops from "../dataFetcher/dataFetcher.js";

/**
 * Determine the closest coffee shops from our position
 *
 * @returns callback for getting the closest coffee shops, relative to the specified position
 */
export default async function coffeeShops() {
  const [coffeeShops, responseCode] = await fetchCoffeeShops();

  /**
   * Determine the distance between our current position and the specified coffee shop
   *
   * @param {*} coffeeShop the coffee shop json object received from the API
   * @param {Object} currentPosition Current coordinates
   * @param {String} currentPosition.x Current X coordinate
   * @param {String} currentPosition.y Current Y coordinate
   * @returns delta value, rounded to four decimals
   */
  function calculateDelta(coffeeShop, currentPosition) {
    const delta = Math.sqrt(
      squareOfDifference(coffeeShop.x, currentPosition.x) +
        squareOfDifference(coffeeShop.y, currentPosition.y)
    );

    return roundToDecimals(delta, 4);
  }

  /**
   * Get the first N coffee shops relative to our position
   *
   * @param {Number} limit indicates the number of coffee shops, or return all if RETRIEVE_ALL_TOKEN is provided
   * @param {Object} position Current coordinates
   * @param {String} position.x Current X coordinate
   * @param {String} position.y Current Y coordinate
   * @returns array of the first N coffee shops
   */
  function getClosestCoffeShops(position, limit) {
    const sortedShops = coffeeShops
      .map((cs) => ({
        ...cs,
        delta: calculateDelta(cs, position),
      }))
      .sort((cs1, cs2) => cs1.delta - cs2.delta);

    return typeof limit === "number"
      ? sortedShops.slice(0, limit)
      : sortedShops;
  }

  function isOk() {
    return responseCode >= 200 && responseCode < 300;
  }

  return {
    isOk,
    getCoffeeShops: getClosestCoffeShops,
  };
}
