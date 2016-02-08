import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

const history = createHistory({ queryKey: false });

injectTapEventPlugin();

ReactDOM.render(
  <Router history={history} routes={routes} />,
  document.querySelector( '.app-container' )
);

