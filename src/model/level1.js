import grid from '../model/grid';
import directions from '../model/directions';

const level1 = () => {
    const fps = 20,
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
                size: 3
            }
        }
    };
};

export default level1;