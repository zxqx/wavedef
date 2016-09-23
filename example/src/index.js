import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import routes from './config/routes.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.css';
import './style/three-osc-synth.css';
import './style/index.css';

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}

render(
  <AppContainer>
    <Router history={browserHistory} routes={routes} />
  </AppContainer>,
  document.getElementById('main')
);
