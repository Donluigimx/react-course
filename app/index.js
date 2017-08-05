let React = require('react');
let ReactDOM = require('react-dom');
let PropTypes = require('prop-types');

require('./index.css');
var App = require('./components/App');




ReactDOM.render(
    <App />,
    document.getElementById('app')
);