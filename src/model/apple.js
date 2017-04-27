import {coordEquals} from './common';

const apple = (grid) => {

    let value = undefined;

    const place = (illegal) => {
        while (true) {
            const coord = grid.anywhere();

            if (illegal.filter(coordEquals(coord)).length === 0) {
                value = coord;
                break;
            }
        }
    };

    return {
        place: place,
        consumeIfPossible: (coord) => {
            if (value && coordEquals(coord)(value)) {
                value = undefined;
                return true;
            }
            return false;
        },
        isPresent: () => value !== undefined,
        get: () => { return value; }
    }
};

export default apple;