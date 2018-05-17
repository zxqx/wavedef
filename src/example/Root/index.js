import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Router } from 'react-router';
import App from '../App';
import routes from '../config/routes';

export default class Root extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
  }

  render() {
    const { history } = this.props;

    return (
      <Router history={history}>
        <App>
          {routes}
        </App>
      </Router>
    );
  }
}
