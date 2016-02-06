import React from 'react';
import test from 'tape';
import TestUtils from 'react-addons-test-utils';
import App from './';

function getShallowInstance ( Component ) {
  const renderer = TestUtils.createRenderer();
  renderer.render( Component );
  return renderer.getRenderOutput();
}

test( 'App renders an h1', t => {
  t.plan( 1 );

  const instance = getShallowInstance( <App /> );
  
  const expected = 'h1';
  const actual = instance.type;

  t.equals( actual, expected, 'rendered an h1 tag' );
});

