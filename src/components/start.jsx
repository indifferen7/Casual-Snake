import React from 'react';
import highscore from '../model/highscore';
import {sleep} from '../model/common';

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleAction = this.handleAction.bind(this);
        this.state = {
            cssClass: 'dialogue hide'
        }
    }

    handleAction(action) {
        this.setState({cssClass: 'dialogue hide'});
        sleep(1200).then(() => this.props.changeView(action));
    }

    componentDidMount() {
        sleep(500).then(() => this.setState({cssClass: 'dialogue show'}));
    }

    render() {
        return (
            <div className={this.state.cssClass}>
                <h1>Omg! Snake! o_o</h1>
                <MenuItem text="Normal" action="normal" handleAction={this.handleAction} />
                <MenuItem text="Hard (not yet implemented)" action="hard" disabled={true} handleAction={this.handleAction} />
                <MenuItem text="Nightmare (not yet implemented)" action="nightmare" disabled={true} handleAction={this.handleAction} />
            </div>
        )
    }
}

class MenuItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.handleAction(this.props.action);
    }

    render() {
        const div = this.props.disabled
            ? (<div className={'menuitem-disabled'}>{this.props.text}</div>)
            : (<div onClick={this.handleClick} className={'menuitem'}>{this.props.text  + ' | High score: ' + highscore(this.props.action).get()}</div>);

        return div;
    }
}

class Start extends React.Component {

    render() {
        return (<div>
            <MainMenu changeView={this.props.changeView} />
        </div>);
    }
}

export default Start;