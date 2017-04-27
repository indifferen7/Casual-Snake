import tick from '../model/tick';
import snake from '../model/snake';
import input from '../model/input';
import apple from '../model/apple';
import {containsCoord} from '../model/common';

const game = (callback, canvasId, level) => {

    let points = 0,
        pool = 0,
        sacrificeThreshold = 10,
        nextDirection = undefined,
        theTick = undefined;

    const theSnake = snake(level.snakeArgs.start, level.snakeArgs.next, level.snakeArgs.opts),
          theApple = apple(level.grid);

    const tickHandler = () => {
        if (nextDirection !== undefined) {
            theSnake.turn(nextDirection);
            nextDirection = undefined;
        }

        const destination = level.snakeArgs.next(theSnake.head(), theSnake.direction()),
              illegalBeforeMove = theSnake.coords().concat(level.walls || []),
              gameOver = containsCoord(destination, illegalBeforeMove),
              entersPool = level.pool && containsCoord(destination, level.pool);

        if (gameOver) {
            callback({ type: 'gameover' });
            return;
        }

        const snakeCoords = theSnake.move(entersPool),
              illegalAfterMove = theSnake.coords().concat(level.walls || []),
              ateApple = snakeCoords.length !== 0 && theApple.consumeIfPossible(theSnake.head());

        if (ateApple) {
            points++;
            theSnake.grow(3);
            theTick.increaseSpeed(level.increaseSpeedBy);
        }

        if (!theApple.isPresent()) {
            theApple.place(illegalAfterMove.concat(level.pool || []));
        }

        let sacrificeCompleted = false;
        if (entersPool) {
            points = points === 0 ? 0 : points - 1;
            if (pool < sacrificeThreshold) {
                pool++;
            } else {
                sacrificeCompleted = true;
                pool = 0;
                points += 20;
                sacrificeThreshold++;
            }
        }

        callback({
            type: 'movement',
            snake: snakeCoords,
            apple: theApple.get(),
            points: points,
            ateApple: ateApple,
            sacrificeComplete: sacrificeCompleted
        });

        if (snakeCoords.length === 0) {
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
        isRunning: theTick.isRunning,
        points: 0
    }
};

export default game;