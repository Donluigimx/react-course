let axios = require('axios');

module.exports = {
    fetchPopularRepos: function (language) {
        let encodeURI = window.encodeURI('https://api.github.com/search/' +
            'repositories?q=stars:>1+languages:'+ language +
            '&sort=stars&order=desc&type=Repositories');

        return axios.get(encodeURI).then(function (response) {
            return response.data.items;
        });
    }
}
