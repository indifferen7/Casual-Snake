import grid from '../grid';
import directions from '../directions';

const hard = () => {
    const fps = 10,
        size = 50,
        theGrid = grid(size, size);

    return {
        fps: fps,
        size: size,
        grid: theGrid,
        snakeArgs: {
            start: theGrid.anywhere(),
            next: theGrid.next,
            opts: {
                direction: directions.any(),
                size: 2
            }
        },
        increaseSpeedBy: 2
    };
};

export default hard;