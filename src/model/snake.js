import directions from '../model/directions.js';

export default function snake(start, next, {direction = directions.any(), size = 2} = {}) {
    let growth = size,
        facing = direction;

    const queue = [start];
    const head = () => { return queue[queue.length - 1] };
    const turnLeft = () => { facing = directions.turnLeft(facing); };
    const turnRight = () => { facing = directions.turnRight(facing); };

    return {
        head: head,
        move: () => {
            queue.push(next(head(), facing));

            if (growth > 0) {
                growth--;
            } else {
                queue.shift();
            }

            return queue;
        },
        turnLeft: turnLeft,
        turnRight: turnRight,
        turn: (direction) => {
            if (directions.turnRight(facing) === direction) {
                turnRight();
            }
            else if (directions.turnLeft(facing) === direction) {
                turnLeft();
            }
        },
        direction: () => { return facing },
        grow: (amount) => {
            growth += amount;
        },
        coords: () => { return queue; }
    }
}