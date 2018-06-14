import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CyanidePage from '../pages/CyanidePage';
import HydraPage from '../pages/HydraPage';
import DrakePage from '../pages/DrakePage';
import NotFoundPage from '../pages/NotFoundPage';

export default (
  <Switch>
    <Route exact path="/" component={CyanidePage} />
    <Route exact path="/hydra" component={HydraPage} />
    <Route exact path="/drake" component={DrakePage} />
    <Route component={NotFoundPage} />
  </Switch>
);
