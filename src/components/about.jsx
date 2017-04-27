import React from 'react';
import {sleep} from '../model/common';

class About extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            cssClass: 'message hide'
        };
    }

    handleClick() {
        this.setState({cssClass: 'message hide'});
        sleep(1200).then(() => this.props.changeView('start'));
    }

    componentDidMount() {
        sleep(500).then(() => this.setState({cssClass: 'message show'}));
    }

    render() {
        const snake = (<span style={{color: '#7D9E3C', fontWeight: 'bold'}}>Snake</span>);

        return (
            <div className={this.state.cssClass} onClick={this.handleClick}>
                <h1 className={'title'}>Casual Snake<span>and the mystical pool</span></h1>
                <p>
                    This {snake} game was created by Martin Moberg in a brave attempt
                    to learn JavaScript. The code is available on <a target="blank" href="https://github.com/indifferen7/casual-snakejs">GitHub</a>.
                </p>
                <p>
                    (tap/click for menu)
                </p>
            </div>
        )
    }
}

export default About;