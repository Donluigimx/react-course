import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

function SelectLanguage(props) {
    let languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
    const { selectedLanguage, onSelect } = props;

    return (
        <ul className="languages">
            {languages.map((lang) => (
                <li
                    style={lang === selectedLanguage ? {color: '#d0021b'}: null}
                    onClick={() => onSelect(lang)}
                    key={lang}>
                    {lang}
                </li>
            ))}
        </ul>
    )
}

function RepoGrid(props) {
    return (
        <ul className="popular-list">
            {props.repos.map(function (repo, index) {
                return (
                    <li key={repo.name} className="popular-item">
                        <div className="popular-rank">#{index + 1}</div>
                        <ul>
                            <li>
                                <img
                                    className="avatar"
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for ' + repo.owner.login}/>
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
};

class Popular extends React.Component {

    state = {
        selectedLanguage: 'All',
        repos: null
    };

    componentDidMount = () => {
        this.updateLanguage(this.state.selectedLanguage)
    };

    updateLanguage = async (lang) => {
        this.setState(function () {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });

        const repos = await fetchPopularRepos(lang);

        this.setState(() => ({ repos }));
    };

    render() {

        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {!this.state.repos
                ? <Loading/>
                : <RepoGrid repos={this.state.repos}/>}
            </div>
        )
    }
}

module.exports = Popular;