import tick from '../model/tick';
import snake from '../model/snake';
import input from '../model/input';
import {apple} from '../model/apple';
import {coordEquals} from '../model/common';

const hitIllegalCoord = (illegal) => {
    return !illegal.reduce(function(acc, val) {
            if (acc === false) {
                return acc;
            }

            if (acc.filter(coordEquals(val)).length > 0) {
                return false;
            } else {
                acc.push(val);
                return acc;
            }
        }, []);
};

const game = (callback, canvasId, level) => {

    let points = 0,
        nextDirection = undefined,
        theTick = undefined;

    const theSnake = snake(level.snakeArgs.start, level.snakeArgs.next, level.snakeArgs.opts),
          theApple = apple(level.grid, theSnake);

    const tickHandler = () => {
        if (nextDirection !== undefined) {
            theSnake.turn(nextDirection);
            nextDirection = undefined;
        }

        const snakeCoords = theSnake.move(),
              ateApple = coordEquals(theSnake.head())(theApple.get());

        if (ateApple) {
            points++;
            theSnake.grow(3);
            theApple.place();
            theTick.increaseSpeed(level.increaseSpeedBy);
        }

        callback({ type: 'movement', snake: snakeCoords, apple: theApple.get(), points: points, length: snakeCoords.length });

        const gameOver = hitIllegalCoord(snakeCoords);

        if (gameOver) {
            callback({ type: 'gameover' });
        }
    };

    theTick = tick(tickHandler, level.fps);

    const inputCallback = ({direction}) => {
        if (direction !== undefined && nextDirection === undefined) {
            nextDirection = direction;
        }
    };

    return {
        start: () => {
            input(inputCallback).withSwipeSupport(canvasId);
            theTick.start();
        },
        stop: theTick.stop,
        points: 0
    }
};

export default game;