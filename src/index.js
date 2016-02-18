import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, useRouterHistory } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';

const history = useRouterHistory(createBrowserHistory)({ queryKey: false });

injectTapEventPlugin();

ReactDOM.render(
  <Router history={history} routes={routes} />,
  document.querySelector( '.app-container' )
);

