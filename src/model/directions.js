const directions = {
    up: 0,
    right: 1,
    down: 2,
    left: 3,

    neighbour: ([x,y], direction) => {
        switch (direction) {
            case directions.up:
                return [x, y - 1];
            case directions.right:
                return [x + 1, y];
            case directions.down:
                return [x, y + 1];
            case directions.left:
                return [x - 1, y];
            default:
                throw 'No such direction: ' + direction;
        }
    },
    turnLeft: (direction) => {
        return direction === directions.up ? directions.left : direction - 1;
    },
    turnRight: (direction) => {
        return direction === directions.left ? directions.up : direction + 1;
    },
    any: () => {
        return Math.floor(Math.random() * 4);
    }
};

export default directions;