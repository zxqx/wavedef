import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App.js';
import DrumSynthUI from '../containers/DrumSynthUI.js';
import ThreeOscSynthUI from '../containers/ThreeOscSynthUI.js';
import OscillatorGroupSynthUI from '../containers/OscillatorGroupSynthUI.js';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={DrumSynthUI} />
    <Route path='drum' component={DrumSynthUI} />
    <Route path='3osc' component={ThreeOscSynthUI} />
    <Route path='osc-group' component={OscillatorGroupSynthUI} />
  </Route>
);
