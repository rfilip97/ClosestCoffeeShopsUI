/**
 * Translate real coordinates to map coordinates
 * @param {Number} x X coordinate
 * @param {Number} y Y coordinate
 * @returns the translated values
 */
export function translateMapCoordinates(x, y) {
    const translateX = (coord) => {
        return (parseInt(coord) + 180) * 10;
    };

    const translateY = (coord) => {
        return (parseInt(coord) + 180) * 10;
    };

    return [translateX(x), translateY(y)];
}

/**
 * Translate map coordinates to real coordinates
 * @param {Number} x X coordinate
 * @param {Number} y Y coordinate
 * @returns the translated values
 */
export function reverseTranslateMapCoordinates(x, y) {
    const revTranslateX = (coord) => {
        return (parseInt(coord) / 10 - 180).toFixed(2);
    };

    const revTranslateY = (coord) => {
        return (parseInt(coord) / 10 - 180).toFixed(2);
    };

    return [revTranslateX(x), revTranslateY(y)];
}