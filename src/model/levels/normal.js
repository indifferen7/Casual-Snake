import grid from '../grid';
import directions from '../directions';
import {vLine} from '../common';

const normal = () => {
    const fps = 10,
          size = 50,
          theGrid = grid(size, size),
          pool = vLine(23)(22, 6)
              .concat(vLine(24)(22, 6))
              .concat(vLine(25)(22, 6))
              .concat(vLine(26)(22, 6))
              .concat(vLine(27)(22, 6))
              .concat(vLine(28)(22, 6));

    return {
        name: 'normal',
        fps: fps,
        size: size,
        grid: theGrid,
        snakeArgs: {
            start: [5,5],
            next: theGrid.next,
            opts: {
                direction: directions.any(),
                size: 2
            }
        },
        pool: pool,
        increaseSpeedBy: 2
    };
};

export default normal;