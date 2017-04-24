import React from 'react';
import Start from './components/start';
import Game from './components/game';
import normal from './model/levels/normal';
import hard from './model/levels/hard';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            view: 'start'
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
                return (<Game changeView={this.changeView} level={hard()} />);
            default:
                return (<Start changeView={this.changeView} />);
        }
    }
}

export default App;
