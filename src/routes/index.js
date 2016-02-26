import React from 'react';
import AppFactory from 'components/app';
import worlds from './worlds';
import model from 'stores/model';
import withModel from 'behaviours/with-model';
import withUiStore from 'behaviours/with-ui-store';
import withTheme from 'behaviours/with-theme';
import withShallowCompare from 'behaviours/with-shallow-compare';

const App = AppFactory(
  React, 
  withModel,
  withShallowCompare,
  withTheme,
  withUiStore
);

export default {
  path: '/',
  component: App,
  indexRoute: {
    onEnter ( nextState, replace ) {
      model.getValue( 'currentUser.ux.lastVisited' ).subscribe( path => replace( path ) );
    },
  },
  childRoutes: [
    worlds,
  ],
};

