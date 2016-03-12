import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { createHistory } from 'history';
import routes from './config/routes.js';

render(
  <Router history={createHistory()} routes={routes} />,
  document.getElementById('main')
);
