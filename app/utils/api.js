import axios from 'axios';

const id = "088c59130d445e0cf7ed";
const sec = "f89076735d4727bda255f2c09cb46c897eef716b";
const params = `?client_id=${id}&client_secret=${sec}`;

async function getProfile(username) {
    const response = await fetch(`https://api.github.com/users/${username}${params}`);
    return response.json();
}

async function getRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`);

    return response.json();
}

function getStarCount(repos) {
    return repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0);
}

function calculateScore({ followers }, repos){
    return (followers * 3) + getStarCount(repos);
}

function handleError(error) {
    console.warn(error);
    return null;
}

async function getUserData(player) {
    const [ profile, repos] = await Promise.all([
        getProfile(player),
        getRepos(player),
    ]);
    return {
        profile: profile,
        score: calculateScore(profile, repos),
    }
}

function sortPlayers(players) {
    return players.sort((a, b) => b.score - a.score)
}

export async function battle (players) {
    const results = await Promise.all(players.map(getUserData))
        .catch(handleError);

    return results === null
        ? results
        :sortPlayers(results)
}

export async function fetchPopularRepos (language) {
    const encodeURI = window.encodeURI(`https://api.github.com/search/
        repositories?q=stars:>1+languages:${language}
        &sort=stars&order=desc&type=Repositories`);

    const response = await fetch(encodeURI)
        .catch(handleError);

    const repos = await response.json();

    return repos.items;
}
