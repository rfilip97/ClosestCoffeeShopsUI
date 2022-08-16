export function translateMapCoordinates(x, y) {
    const translateCoord = (coord) => {
        return (parseInt(coord) + 180) * 10;
    };

    return [translateCoord(x), translateCoord(y)];
}
