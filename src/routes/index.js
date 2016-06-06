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

const styles = {
  betaWrap: {
    width: '50%',
    margin: '5% auto 0',
    padding: '2em',
    background: '#0e4254',
    borderRadius: '1em'
  },
  logoImg: {
    display: 'block',
    maxWidth: '80%',
    margin: '0 auto'
  },
  betaContent: {
    marginTop: '2em',
    padding: '1em',
    background: 'white',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.4em',
    borderRadius: '1em'
  }
};

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
          <div style={styles.betaWrap}>
            <div>
              <img style={styles.logoImg} src="http://getstoryshop.com/img/logo.png" />
              <div style={styles.betaContent}>
                <p>StoryShop is currently in private beta.</p>
                <p>If you are a beta user and believe you are seeing this message in error, please be sure to check the app status at <a href="http://status.storyshopapp.com">http://status.storyshopapp.com</a>, before contacting us for support through <a href="http://feedback.storyshopapp.com">http://feedback.storyshopapp.com</a>. Thank you!</p>
              </div>
            </div>
          </div>
        );
      },
    },
  ],
};

