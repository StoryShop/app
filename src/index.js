import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import model from './model';
import App from './components/app';

injectTapEventPlugin();

ReactDOM.render( <App model={ model } />, document.querySelector( '.app-container' ) );

