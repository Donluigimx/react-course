import React from 'react';
import queryString from 'query-string';
import { battle } from '../utils/api';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function Profile (props) {
    const { info } = props;

    return (
        <PlayerPreview avatar={info.avatar_url} username={info.login}>
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>
        </PlayerPreview>
    )
}

function Player (props) {
    const { label, score, profile } = props;
    return (
        <div>
            <h1 className="header">{ label }</h1>
            <h3 style={{textAlign: 'center'}}>Score { score }</h3>
            <Profile info={profile}/>
        </div>
    )
}

class Results extends React.Component {

    state = {
        winner: null,
        loser: null,
        error: null,
        loading: true,
    };

    async componentDidMount () {
        let players = queryString.parse(this.props.location.search);

        const results = await battle([
            players.playerOneName,
            players.playerTwoName,
        ]);
        if (results === null) {
            return this.setState(() => ({
                error: 'Looks like there is an error with the Github API',
                loading: false,
            }));
        }

        else {
            this.setState(() => ({
                error: null,
                winner: results[0],
                loser: results[1],
                loading: false
            }));
        }
    }

    render() {
        let error = this.state.error;
        let winner = this.state.winner;
        let loser = this.state.loser;
        let loading = this.state.loading;

        if (loading === true) {
            return <Loading />
        }
        if (error !== null) {
            return (
                <div>
                    <p>{error}</p>
                </div>
            )
        }

        return (
            <div className='row'>
                <Player
                    label='Winner'
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player
                    label='Loser'
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        )
    }
}

export default Results;