import directions from '../model/directions';
import * as Hammer from 'hammerjs';

const activateSwipeSupport = (callback, canvasId) => {
    const hammer = new Hammer.default(document.getElementById(canvasId));

    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    hammer.on('swipeup', function() {
        callback({direction: directions.up});
    });
    hammer.on('swiperight', function() {
        callback({direction: directions.right});
    });
    hammer.on('swipedown', function() {
        callback({direction: directions.down});
    });
    hammer.on('swipeleft', function() {
        callback({direction: directions.left});
    });
};

export const input = (callback) => {

    const handler = (event) => {
        if(event.keyCode === 39) {
            callback({direction: directions.right});
        }
        else if(event.keyCode === 37) {
            callback({direction: directions.left});
        }
        else if(event.keyCode === 40) {
            callback({direction: directions.down});
        }
        else if(event.keyCode === 38) {
            callback({direction: directions.up});
        }
    };

    document.addEventListener('keydown', handler, false);

    return {
        withSwipeSupport: (canvasId) => {
            activateSwipeSupport(callback, canvasId);
        }
    };
};

export default input;