import React from 'react';
import {sleep} from '../model/common';

class Manual extends React.Component {

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
        localStorage.setItem("firstPlay", false);
    }

    render() {
        const snake = (<span style={{color: '#7D9E3C', fontWeight: 'bold'}}>Snake</span>),
              pixelApples = (<span style={{color: '#FE9F8C', fontWeight: 'bold'}}>pixel apples</span>),
              pool = (<span style={{color: '#6ABCEB', fontWeight: 'bold'}}>pool</span>),
              walls = (<span style={{color: '#73581D', fontWeight: 'bold'}}>walls</span>);

        return (
            <div className={this.state.cssClass} onClick={this.handleClick}>
                <h1 className={'title'}>Casual Snake<span>and the mystical pool</span></h1>
                <p>
                    One night, {snake} had a dream. {snake} dreamt of a world with
                    unlimited supplies of tasty {pixelApples}, which was his favorite snack.
                    However, the dream was not a happy one. In this world, a mystical and
                    terrible {pool} called out for him, promising great rewards, but at the
                    cost of great sacrifice. The strange situation {snake} was in made him
                    crawl around in such a pace that {walls} and even his own body became a
                    lethal threat.
                </p>
                <p>
                    The {pool} calls as the dream carries on.
                </p>
                <p>
                    (tap/click for menu)
                </p>
            </div>
        )
    }
}

export default Manual;