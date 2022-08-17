export function translateMapCoordinates(x, y) {
    const translateX = (coord) => {
        return (parseInt(coord) + 180) * 10;
    };

    const translateY = (coord) => {
        return (parseInt(coord) + 180) * 10;
    };

    return [translateX(x), translateY(y)];
}
