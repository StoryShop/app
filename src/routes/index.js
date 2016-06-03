import React from 'react';
import AppFactory from 'components/app';
import Main from 'components/main';
import worlds from './worlds';
import login from './login';
import { model } from 'stores/model';
import uiStore from 'stores/ui';
import { setTheme } from 'stores/actions/meta';
import withUiStore from 'behaviours/with-ui-store';
import withTheme from 'behaviours/with-theme';
import withShallowCompare from 'behaviours/with-shallow-compare';

const App = AppFactory(
  React,
  withShallowCompare,
  withTheme,
  withUiStore
);

export default {
  path: '/',
  component: ({ children }) => children,
  indexRoute: login,
  childRoutes: [
    {
      path: 'app',
      component: App,
      childRoutes: [
        worlds,
      ],
    },
    {
      path: 'beta',
      component: () => {
        return (
          <p>StoryShop is currently in private beta.</p>
        );
      },
    },
  ],
};

