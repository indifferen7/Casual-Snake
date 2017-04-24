
export default function tick(callback, fps = 1) {
    let running = false,
        interval = 1000 / fps,
        lastTime = (new Date()).getTime();

    const run = () => {
        if (!running) {
            return;
        }

        window.requestAnimationFrame(run);

        const now = (new Date()).getTime(),
            delta = (now - lastTime);

        if (delta > interval) {
            callback();
            lastTime = now - (delta % interval);
        }
    };

    return {
        start: () => {
            running = true;
            run();
        },
        increaseSpeed: (amount) => {
            interval = interval - amount > 1 ? interval - amount : 1;
        },
        isRunning: running,
        stop: () => {
            running = false;
        }
    }
}