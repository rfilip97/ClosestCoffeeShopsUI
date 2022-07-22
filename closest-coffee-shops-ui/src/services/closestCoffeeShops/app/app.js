import fetchCoffeeShops from "../dataFetcher/dataFetcher.js";
import errorCodes from "../utils/errorcodes.js";
import { errorResponse } from "../utils/utils.js";
import SortedDeltaCoffeeShopList from "../coffeeShopsComponents/sortedDeltaCoffeeShopList.js";

/**
 * Get the 3 closest coffee shops relative to current position
 *
 * @param {Object} position
 * @param {Number} position.x
 * @param {Number} position.y
 *
 * @returns {Array<position>}
 */
export async function getNearestShops(position) {
  // Check if we received numbers as arguments
  if (isNaN(position.x) || isNaN(position.y)) {
    console.log("Invalid input: numbers expected");
    return errorResponse(errorCodes.INVALID_INPUT_ARGS_NAN);
  }

  // Get the list of coffee shops
  const [coffeeShops, responseCode] = await fetchCoffeeShops();

  // Handle different response codes
  switch (responseCode) {
    case 200:
      break;

    case 401:
      console.log(
        "Failed fetching coffee shops list - Unauthorized. Error code: " +
          responseCode
      );
      return errorResponse(errorCodes.UNAUTHORIZED);

    case 406:
      console.log(
        "Failed fetching coffee shops list - Unacceptable Accept format. Error code: " +
          responseCode
      );
      return errorResponse(errorCodes.UNACCEPTABLE_ACCEPT_FORMAT);

    case 503:
      console.log(
        "Failed fetching coffee shops list - Service Unavailable. Error code: " +
          responseCode
      );
      return errorResponse(errorCodes.SERVICE_UNAVAILABLE);

    case 504:
      console.log(
        "Failed fetching coffee shops list - Timeout. Error code: " +
          responseCode
      );
      return errorResponse(errorCodes.TIMEOUT);

    default:
      console.log(
        "Failed fetching coffee shops list. Error code: " + responseCode
      );
      return errorResponse(errorCodes.GENERIC_ERROR);
  }

  // Create a sorted coffee shop list, relative to our position
  const sortedDeltaCoffeShopList = new SortedDeltaCoffeeShopList(
    coffeeShops,
    position.x,
    position.y
  );

  // Get the closest 3 coffee shops
  return sortedDeltaCoffeShopList.getNClosestCoffeShops(3);
}
