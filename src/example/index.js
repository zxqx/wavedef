import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import Root from './Root';
import './index.css';

const history = createHistory();

render(
  <Root history={history} />,
  document.getElementById('root'),
);
