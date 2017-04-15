import tick from '../model/tick';
import snake from '../model/snake';
import input from '../model/input';
import {apple} from '../model/apple';
import {deepEquals} from '../model/common';

const hitIllegalCoord = (illegal) => {
    return !illegal.reduce(function(acc, val) {
            if (acc === false) {
                return acc;
            }

            if (acc.filter(deepEquals(val)).length > 0) {
                return false;
            } else {
                acc.push(val);
                return acc;
            }
        }, []);
};

const game = (callback, canvasId, level) => {

    let points = 0,
        nextDirection = undefined;

    const theSnake = snake(level.snakeArgs.start, level.snakeArgs.next, level.snakeArgs.opts),
          theApple = apple(level.grid, theSnake);

    const tickHandler = () => {
        if (nextDirection !== undefined) {
            theSnake.turn(nextDirection);
            nextDirection = undefined;
        }

        const snakeCoords = theSnake.move();

        if (deepEquals(theSnake.head())(theApple.get())) {
            points++;
            theSnake.grow(3);
            theApple.place();
        }

        callback({ type: 'movement', snake: snakeCoords, apple: theApple.get(), points: points, length: snakeCoords.length });

        const gameOver = hitIllegalCoord(snakeCoords);

        if (gameOver) {
            callback({ type: 'gameover' });
        }
    };

    const keyHandler = (callback) => ({direction, reset}) => {
        if (direction !== undefined && nextDirection === undefined) {
            nextDirection = direction;
        }
    };

    const theTick = tick(tickHandler, level.fps);

    return {
        start: () => {
            input(keyHandler(callback), canvasId);
            theTick.start();
        },
        stop: theTick.stop,
        points: 0
    }
};

export default game;