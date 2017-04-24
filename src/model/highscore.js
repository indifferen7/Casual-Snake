const highscore = (name) => {

    const current = () => localStorage.getItem(name) || 0;

    return {
        get: () => current(),
        update: (value) => {
            if (value > current()) {
                localStorage.setItem(name, value);
            }
        }
    };
};

export default highscore;