import fetchCoffeeShops from "../dataFetcher/dataFetcher.js";

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
   * @param {Object} currentPosition Current coordinates
   * @param {String} currentPosition.x Current X coordinate
   * @param {String} currentPosition.y Current Y coordinate
   * @returns array of the first N coffee shops
   */
  function getNClosestCoffeShops(n, currentPosition) {
    let sortedCoffeeShops = coffeeShops.map((cs) => ({
      ...cs,
      delta: currentPosition && calculateDelta(cs, currentPosition),
    }));
    sortedCoffeeShops.sort((cs1, cs2) => cs1.delta - cs2.delta);

    return sortedCoffeeShops.slice(0, n);
  }

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
    const squareOfDifference = (a, b) => Math.pow(a - b, 2);
    const delta = Math.sqrt(
      squareOfDifference(coffeeShop.x, currentPosition.x) +
        squareOfDifference(coffeeShop.y, currentPosition.y)
    );

    const roundToDecimals = (a) => {
      const factor = Math.pow(10, a);
      return (b) => Math.round(b * factor) / factor;
    };

    const roundToFourDecimals = roundToDecimals(4);
    return roundToFourDecimals(delta);
  }

  function getCoffeeShops(currentPosition) {
    return getNClosestCoffeShops(Number.MAX_SAFE_INTEGER, currentPosition);
  }

  function isOk() {
    return responseCode >= 200 && responseCode < 300;
  }

  return {
    isOk,
    getCoffeeShops,
    getNClosestCoffeShops,
  };
}
