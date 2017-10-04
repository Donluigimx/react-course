import React from 'react';
import PropTypes from 'prop-types';

let styles = {
    content: {
        textAlign: 'Center',
        fontSize: '35px',
    }
};

class Loading extends React.Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        speed: PropTypes.number.isRequired,
    };

    static defaultProps = {
        text: 'Loading',
        speed: 200,
    };

    state = {
        text: this.props.text,
    };

    componentDidMount() {
        let stopper = `${this.state.text}...`;
        this.interval = window.setInterval(() => {
            if (this.state.text === stopper) {
                this.setState(() => ({
                    text: this.props.text,
                }))
            } else {
                this.setState((prevState) => ({
                    text: `${prevState.text}.`
                }))
            }
        }, this.props.speed)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render() {
        const { text } = this.state;
        return (
            <p style={styles.content}>
                { text }
            </p>
        )
    }
}

export default Loading;