import './preamble.js';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createHistory } from 'history';
import thunk from 'redux-thunk';
import routes from './config/routes.js';
import rootReducer from './reducers/root.js';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <Router history={createHistory()} routes={routes} />
  </Provider>,
  document.getElementById('main')
);
