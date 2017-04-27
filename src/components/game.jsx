import React from 'react';
import Grid from '../components/grid';
import game from '../model/game';
import highscore from '../model/highscore';
import {sleep} from '../model/common';
import sounds from '../model/sounds';

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.returnToMenu = this.returnToMenu.bind(this);
        this.hideGridAndStatus = this.hideGridAndStatus.bind(this);
        this.showOutcome = this.showOutcome.bind(this);
        this.callback = this.callback.bind(this);

        this.scoreToBeat = highscore(this.props.level.name).get();

        this.state = {
            points: 0,
            game:  game(this.callback, 'canvas', this.props.level),
            showGrid: false,
            showOutcome: false,
            showStatus: false,
        };
    }

    callback(payload) {
        if (payload.type === 'movement') {
            this.setState({
                snake: payload.snake,
                apple: payload.apple,
                points: payload.points
            });

            if (payload.ateApple) {
                sounds.nom.play();
            }
            if (payload.sacrificeComplete) {
                sounds.sacrificeComplete.play();
            }
        }
        else if (payload.type === 'gameover') {
            this.stop();
        }
    }

    start() {
        sleep(200)
            .then(() => this.setState({showGrid: true}))
            .then(() => sleep(1000).then(() => {
                this.state.game.start();
                this.setState({showStatus: true});
        }));
    }

    hideGridAndStatus() {
        return sleep(500).then(() => {
            this.setState({
                showGrid: false,
                showStatus: false
            });
        });
    }

    showOutcome() {
        return sleep(1000).then(() => {
            this.setState({
                showOutcome: true
            });
        });
    }

    stop() {
        this.state.game.stop();
        sounds.gameover.play();
        highscore(this.props.level.name).update(this.state.points);

        this.hideGridAndStatus().then(this.showOutcome());
    }

    returnToMenu() {
        return sleep(200)
            .then(() => this.setState({showOutcome: false}))
            .then(() => sleep(1000).then(() =>
                this.props.changeView('start')
            ));
    }

    render() {
        const dimensions = window.innerHeight > window.innerWidth
            ? window.innerWidth
            : window.innerHeight;

        const showStatus = this.state.showStatus ? 'block' : 'none',
              newRecord = this.state.points > this.scoreToBeat;

        return (
            <div style={{margin: '0 auto', width: dimensions, height: dimensions}} id={'game'}>
                <div id={'status'} style={{display: showStatus, textAlign: 'center'}}>Points: {this.state.points} | Best: {this.scoreToBeat}</div>
                <Outcome returnToMenu={this.returnToMenu}
                         points={this.state.points}
                         newRecord={newRecord}
                         show={this.state.showOutcome} />
                <Grid snake={this.state.snake}
                      apple={this.state.apple}
                      walls={this.props.level.walls}
                      pool={this.props.level.pool}
                      show={this.state.showGrid}
                      size={this.props.level.size}
                      start={this.start}/>
            </div>
        );
    }
}

class Outcome extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.returnToMenu();
    }

    render() {
        const className = this.props.show ? 'dialogue show' : 'dialogue hide',
            newRecord = this.props.newRecord ? 'That\'s a new personal best! Yay!' : '';

        return (
            <div className={className} style={{color: '#73581D', cursor: 'pointer', textAlign: 'center'}} onClick={this.handleClick}>
                <h1 className={'title'}>Casual Snake<span>and the mystical pool</span></h1>
                <div className={'result'}>
                    Final score:
                    <span style={{fontSize: '2em', display: 'block',textShadow: '.05em .05em #FE9F8C', marginBottom: '.2em'}}>
                        {this.props.points} points
                    </span>
                    {newRecord}
                </div>
                <p>
                    (tap/click here to return to menu)
                </p>
            </div>
        );
    }
}

export default Game;
