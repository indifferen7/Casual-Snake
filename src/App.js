import React, { Component } from 'react';
import Grid from './components/grid';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.setInfo = this.setInfo.bind(this);
        this.state = {points: 0};
    }

    setInfo({points, length}) {
        this.setState({
            points: points,
            length: length
        });
    }

    render() {
        const dimensions = window.innerHeight > window.innerWidth
            ? window.innerWidth
            : window.innerHeight;

        return (
            <div style={{margin: '0 auto', width: dimensions, height: dimensions}} id={'game'}>
                <div style={{position: 'absolute', color: '#73581D', margin: '5px'}}>Points: {this.state.points} | Snake length: {this.state.length}</div>
                <Grid setInfo={this.setInfo} />
            </div>
        );
    }
}

export default App;
