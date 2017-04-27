
export const coordEquals = ([x1, y1]) => {
    return ([x2, y2]) => {
        return x1 === x2 && y1 === y2;
    };
};

export const containsCoord = (coord, coords) => {
    const fn = coordEquals(coord);

    return coords.filter(fn).length > 0;
};

export const sleep = (time) =>
    new Promise((resolve) => setTimeout(resolve, time));

/**
 * Returns a range of numbers from start (inclusive)
 * to end (exclusive).
 */
export const range = (start, end) => [...new Array(end - start).keys()].map(v => start + v);

export const hLine = (y) =>
    (x, length) => range(x, x + length).map(newX => [newX, y]);

export const vLine = (x) =>
    (y, length) => range(y, y + length).map(newY => [x, newY]);