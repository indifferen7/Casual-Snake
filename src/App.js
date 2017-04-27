import React from 'react';
import Start from './components/start';
import Game from './components/game';
import normal from './model/levels/normal';
import hard from './model/levels/hard';
import nightmare from './model/levels/nightmare';
import Manual from './components/manual';
import About from './components/about';

class App extends React.Component {

    constructor(props) {
        super(props);

        const firstPlay = localStorage.getItem("firstPlay") === null;

        this.state = {
            view: firstPlay ? 'manual' : 'start'
        };

        this.changeView = this.changeView.bind(this);
    }

    changeView(view) {
        this.setState({view: view});
    }

    render() {
        switch (this.state.view) {
            case 'normal':
                return (<Game changeView={this.changeView} level={normal()} />);
            case 'hard':
                return (<Game changeView={this.changeView} level={hard()} />);
            case 'nightmare':
                return (<Game changeView={this.changeView} level={nightmare()} />);
            case 'manual':
                return (<Manual changeView={this.changeView} />);
            case 'about':
                return (<About changeView={this.changeView} />);
            default:
                return (<Start changeView={this.changeView} />);
        }
    }
}

export default App;
