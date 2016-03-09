import React from 'react';
import AppFactory from 'components/app';
import worlds from './worlds';
import { model } from 'stores/model';
import uiStore from 'stores/ui';
import { setTheme } from 'stores/actions/meta';
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
    onEnter ( nextState, replace, callback ) {
      // TODO: move to react-side-effect to allow nesting
      uiStore.dispatch( setTheme( 'main' ) );
      model.getValue( 'currentUser.ux.lastVisited' )
        .subscribe( path => {
          replace( path );
          callback()
        })
        ;
    },
  },
  childRoutes: [
    worlds,
  ],
};

