import grid from '../model/grid';
import directions from '../model/directions';

const level1 = () => {
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

export default level1;