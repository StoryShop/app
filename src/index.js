import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router } from 'react-router';
import historyStore from 'stores/history';
import debug from 'debug';
import routes from 'routes';
import ReactGA from 'react-ga';
import Logger from 'utils/logger';

const log = Logger( 'Router' );

const reElement = /elements\/.*_k=/;
const reElements = /elements/;
const reOutline = /outlines\/.*/;
const reOutlines = /outlines/;
const reCharacter = /characters\/.*/;
const reCharacters = /characters/;
const reWorld = /worlds\/.*/;
const reWorlds = /app/;

function getThePath() {
  if ( window.location.hash.match( reElement ) ) {
    return '/GA/one-element';
  } else if ( window.location.hash.match( reElements ) ) {
    return '/GA/elements';
  } else if ( window.location.hash.match( reOutline ) ) {
    return '/GA/one-outline';
  } else if ( window.location.hash.match( reOutlines ) ) {
    return '/GA/outlines';
  } else if ( window.location.hash.match( reCharacter ) ) {
    return '/GA/one-character';
  } else if ( window.location.hash.match( reCharacters ) ) {
    return '/GA/characters';
  } else if ( window.location.hash.match( reWorld ) ) {
    return '/GA/one-world';
  } else if ( window.location.hash.match( reWorlds ) ) {
    return '/GA/worlds';
  } else {
    return window.location.hash;
  }
}

function logPageView() {
  const thePath = getThePath();
  ReactGA.set({ page: thePath });
  ReactGA.pageview(thePath);
  log.debug( 'ReactGA set/pageview:', thePath );
}

injectTapEventPlugin();

debug.enable( 'StoryShop:*' );

ReactGA.initialize('UA-79241060-1');

ReactDOM.render(
  <Router history={historyStore} routes={routes} onUpdate={logPageView} />,
  document.querySelector( '.app-container' )
);

