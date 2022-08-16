import fetchCoffeeShops from "../dataFetcher/dataFetcher.js";
import { RETRIEVE_ALL_TOKEN } from '../utils/utils'

/**
 * Determine the closest coffee shops from our position
 * 
 * @param {point} currentPosition Current x and y coordinates
 * @returns callback for getting the closest coffee shops, relative to the specified position
 */
export default async function coffeeShops(currentPosition) {
    const [coffeeShops, responseCode] = await fetchCoffeeShops();

    /**
     * Get the first N coffee shops relative to our position
     * 
     * @param {Number} n indicates the number of coffee shops, or return all if RETRIEVE_ALL_TOKEN is provided
     * @returns array of the first N coffee shops
     */
    function getNClosestCoffeShops(n) {
        let sortedCoffeeShops = coffeeShops;

        for (let coffeeShop of sortedCoffeeShops) {
            coffeeShop.delta = calculateDelta(coffeeShop);
        }

        sortedCoffeeShops.sort((cs1, cs2) => (calculateDelta(cs1) - calculateDelta(cs2)));
        return (n === RETRIEVE_ALL_TOKEN) ? sortedCoffeeShops : sortedCoffeeShops.slice(0, 3);
    };

    /**
     * Determine the distance between our current position and the specified coffee shop
     * 
     * @param {*} coffeeShop the coffee shop json object received from the API
     * @returns delta value, rounded to four decimals
     */
    function calculateDelta(coffeeShop) {
        const delta = Math.sqrt(
            Math.pow(coffeeShop.x - currentPosition.x, 2) + Math.pow(coffeeShop.y - currentPosition.y, 2)
        );

        return parseFloat(parseFloat(delta).toFixed(4));
    }

    return getNClosestCoffeShops;
};