import {deepEquals} from '../model/common';

export const apple = (grid, snake) => {

    let value = undefined;

    const place = () => {
        while (true) {
            const coord = grid.anywhere();

            if (snake.coords().filter(deepEquals(coord)).length === 0) {
                value = coord;
                break;
            }
        }
    };

    place();

    return {
        place: place,
        get: () => { return value; }
    }
};

export default apple;