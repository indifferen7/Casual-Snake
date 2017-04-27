import grid from '../grid';
import directions from '../directions';
import {hLine, vLine} from '../common';

const nightmare = () => {
    const fps = 12,
        size = 50,
        theGrid = grid(size, size),
        pool = vLine(23)(22, 6)
            .concat(vLine(24)(22, 6))
            .concat(vLine(25)(22, 6))
            .concat(vLine(26)(22, 6))
            .concat(vLine(27)(22, 6))
            .concat(vLine(28)(22, 6)),
        walls = hLine(0)(0, 20)
            .concat(hLine(0)(30, 20))
            .concat(hLine(49)(0, 20))
            .concat(hLine(49)(30, 20))
            .concat(vLine(0)(1, 19))
            .concat(vLine(0)(30, 19))
            .concat(vLine(49)(1, 19))
            .concat(vLine(49)(30, 19))
            .concat(vLine(10)(10, 30))
            .concat(vLine(40)(10, 30))
            .concat(hLine(10)(11, 5))
            .concat(hLine(11)(11, 5))
            .concat(hLine(39)(11, 14))
            .concat(hLine(10)(26, 14))
            .concat(hLine(39)(35, 5))
            .concat(hLine(38)(35, 5));

    return {
        name: 'nightmare',
        fps: fps,
        size: size,
        grid: theGrid,
        snakeArgs: {
            start: [21,21],
            next: theGrid.next,
            opts: {
                direction: directions.up,
                size: 2
            }
        },
        pool: pool,
        walls: walls,
        increaseSpeedBy: 2
    };
};

export default nightmare;