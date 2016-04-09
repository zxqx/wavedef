import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App.js';
//import DrumSynthUI from '../containers/DrumSynthUI.js';
import ThreeOscSynthUI from '../containers/ThreeOscSynthUI.js';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={ThreeOscSynthUI} />
    //<Route path='drum' component={DrumSynthUI} />
    <Route path='3osc' component={ThreeOscSynthUI} />
  </Route>
);
