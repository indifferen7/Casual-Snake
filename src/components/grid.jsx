import React from 'react';

class Grid extends React.Component {

    componentDidMount() {
        this.props.start();
    }

    componentDidUpdate() {
        if (!this.props.snake) {
            return;
        }

        const dimensions = window.innerHeight > window.innerWidth
            ? window.innerWidth
            : window.innerHeight;

        const cellSize = dimensions / this.props.size;

        const ctx = this.refs.canvas.getContext('2d');

        ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

        ctx.fillStyle = '#FE9F8C';
        ctx.fillRect(this.props.apple[0] * cellSize, this.props.apple[1] * cellSize, cellSize, cellSize);

        ctx.fillStyle = '#7D9E3C';

        this.props.snake.forEach(cell => {
            ctx.fillRect(cell[0] * cellSize, cell[1] * cellSize, cellSize, cellSize);
        });

        if (this.props.walls) {
            ctx.fillStyle = '#73581D';
            this.props.walls.forEach(cell => {
                ctx.fillRect(cell[0] * cellSize, cell[1] * cellSize, cellSize, cellSize);
            });
        }

        if (this.props.pool) {
            ctx.fillStyle = '#6ABCEB';
            this.props.pool.forEach(cell => {
                ctx.fillRect(cell[0] * cellSize, cell[1] * cellSize, cellSize, cellSize);
            });
        }
    }

    render() {
        const className = this.props.show ? 'show' : 'hide';

        const dimensions = window.innerHeight > window.innerWidth
            ? window.innerWidth
            : window.innerHeight;

        return (<canvas className={className} ref='canvas' id={'canvas'} width={dimensions} height={dimensions}/>);
    }
}

export default Grid;