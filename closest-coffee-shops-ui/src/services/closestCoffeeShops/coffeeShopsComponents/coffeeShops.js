import fetchCoffeeShops from "../dataFetcher/dataFetcher.js";
import { RETRIEVE_ALL_TOKEN } from "../utils/utils";

/**
 * Determine the closest coffee shops from our position
 *
 * @returns callback for getting the closest coffee shops, relative to the specified position
 */
export default async function coffeeShops() {
  const [coffeeShops, responseCode] = await fetchCoffeeShops();

  /**
   * Get the first N coffee shops relative to our position
   *
   * @param {Number} n indicates the number of coffee shops, or return all if RETRIEVE_ALL_TOKEN is provided
   * @param {point} currentPosition Current x and y coordinates
   * @returns array of the first N coffee shops
   */
  function getNClosestCoffeShops(n, currentPosition) {
    let sortedCoffeeShops = coffeeShops.map((cs) => ({
      ...cs,
      delta: calculateDelta(cs, currentPosition),
    }));
    sortedCoffeeShops.sort((cs1, cs2) => cs1.delta - cs2.delta);

    return n === RETRIEVE_ALL_TOKEN
      ? sortedCoffeeShops
      : sortedCoffeeShops.slice(0, 3);
  }

  /**
   * Determine the distance between our current position and the specified coffee shop
   *
   * @param {*} coffeeShop the coffee shop json object received from the API
   * @param {point} currentPosition Current x and y coordinates
   * @returns delta value, rounded to four decimals
   */
  function calculateDelta(coffeeShop, currentPosition) {
    const squareOfDifference = (a, b) => Math.pow(a - b, 2);
    const delta = Math.sqrt(
      squareOfDifference(coffeeShop.x - currentPosition.x) +
        squareOfDifference(coffeeShop.y - currentPosition.y)
    );

    return Math.round(delta * 10000) / 10000;
  }

  return getNClosestCoffeShops;
}
