import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router } from 'react-router';
import historyStore from 'stores/history';
import debug from 'debug';
import routes from 'routes';

injectTapEventPlugin();

debug.enable( 'StoryShop:*' );

ReactDOM.render(
  <Router history={historyStore} routes={routes} />,
  document.querySelector( '.app-container' )
);

