import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router } from 'react-router';
import routes from 'routes';
import historyStore from 'stores/history';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={historyStore} routes={routes} />,
  document.querySelector( '.app-container' )
);

