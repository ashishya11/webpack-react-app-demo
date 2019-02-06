import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';


export default class Main extends Component {

    render() {
        return (
            <Router>
                {this.props.routes}
            </Router>
        );
    }
}

Main.propTypes = {
    routes: PropTypes.element.isRequired,
};