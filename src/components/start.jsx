import React from 'react';
import highscore from '../model/highscore';
import {sleep} from '../model/common';

class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleAction = this.handleAction.bind(this);
        this.state = {
            cssClass: 'dialogue hide'
        };
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
                <h1 className={'title'}>Casual Snake<span>and the mystical pool</span></h1>
                <LevelItem text="Normal" action="normal" handleAction={this.handleAction} />
                <LevelItem text="Hard" action="hard" handleAction={this.handleAction} />
                <LevelItem text="Nightmare" action="nightmare" handleAction={this.handleAction} />
                <InfoItem text="The story" action="manual" handleAction={this.handleAction} />
                <InfoItem text="About" action="about" handleAction={this.handleAction} />
            </div>
        )
    }
}

class LevelItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.handleAction(this.props.action);
    }

    render() {
        return this.props.disabled
            ? (<div className={'menuitem-disabled'}>{this.props.text}</div>)
            : (<div onClick={this.handleClick} className={'menuitem'}>{this.props.text  + ' | Personal best: ' + highscore(this.props.action).get()}</div>);
    }
}

class InfoItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.handleAction(this.props.action);
    }

    render() {
        return (<div onClick={this.handleClick} className={'infoitem'}>{this.props.text}</div>);
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