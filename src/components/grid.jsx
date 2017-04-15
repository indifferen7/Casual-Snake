import React from 'react';
import level1 from '../model/level1'
import game from '../model/game';

class Grid extends React.Component {

    constructor(props) {
        super(props);

        this.callback = (payload) => {

            if (payload.type === 'movement') {
                this.setState({ snake: payload.snake, apple: payload.apple });
                this.props.setInfo({points: payload.points, length: payload.length});
            }
            else if (payload.type === 'gameover') {
                this.state.game.stop();
            }
        };
    }

    componentWillMount() {
        const level = level1();

        this.setState({
            game:  game(this.callback, 'canvas', level),
            size: level.size
        });
    }

    componentDidMount() {
        this.state.game.start();
    }

    componentDidUpdate() {
        const dimensions = window.innerHeight > window.innerWidth
            ? window.innerWidth
            : window.innerHeight;

        const cellSize = dimensions / this.state.size;

        const ctx = this.refs.canvas.getContext('2d');


        ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);

        ctx.fillStyle = '#7D9E3C';
        this.state.snake.forEach(cell => {
            ctx.fillRect(cell[0] * cellSize, cell[1] * cellSize, cellSize, cellSize);
        });

        ctx.fillStyle = '#FE9F8C';
        ctx.fillRect(this.state.apple[0] * cellSize, this.state.apple[1] * cellSize, cellSize, cellSize);
    }

    render() {
        const dimensions = window.innerHeight > window.innerWidth
            ? window.innerWidth
            : window.innerHeight;

        return (<canvas style={{float: 'left'}} ref='canvas' id={'canvas'} width={dimensions} height={dimensions}/>);
    }
}

export default Grid;