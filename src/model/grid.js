import directions from '../model/directions';

const grid = (rows, cols) => {

    const has = ([x, y]) => {
        return x >= 0
            && y >= 0
            && x < cols
            && y < rows;
    };

    const next = (coord, direction) => {

        let [x,y] = coord,
            result = directions.neighbour(coord, direction);

        if (has(result)) {
            return result;
        } else {
            if (direction === directions.up) {
                result = [x, rows - 1];
            }
            else if (direction === directions.right) {
                result = [0, y];
            }
            else if (direction === directions.down) {
                result = [x, 0];
            }
            else if (direction === directions.left) {
                result = [cols - 1, y];
            }
        }

        return result;
    };

    const anywhere = () => {
        const maxX = Math.floor(cols),
            maxY = Math.floor(rows);

        return [Math.floor(Math.random() * maxX), Math.floor(Math.random() * maxY)];
    };

    return {
        next,
        anywhere
    }
};

export default grid;