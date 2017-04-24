import grid from '../grid';
import directions from '../directions';

const normal = () => {
    const fps = 10,
          size = 50,
          theGrid = grid(size, size);

    return {
        name: 'normal',
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
        increaseSpeedBy: 1.5
    };
};

export default normal;