import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CyanidePage from '../pages/CyanidePage';
import NotFoundPage from '../pages/NotFoundPage';

export default (
  <Switch>
    <Route exact path="/" component={CyanidePage} />
    <Route component={NotFoundPage} />
  </Switch>
);
