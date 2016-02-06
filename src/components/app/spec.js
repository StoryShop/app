import React from 'react';
import test from 'tape';
import TestUtils from 'react-addons-test-utils';
import AppBar from 'material-ui/lib/app-bar';
import App from './';

function getShallowInstance ( Component ) {
  const renderer = TestUtils.createRenderer();
  renderer.render( Component );
  return renderer.getRenderOutput();
}

test( 'App Render Method', t => {
  t.plan( 1 );

  const instance = getShallowInstance( <App /> );
  
  const expected = AppBar;
  const actual = instance.type;

  t.equals( actual, expected, 'rendered an AppBar' );
});

