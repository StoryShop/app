import React from 'react';
import test from 'tape';
import AppBar from 'material-ui/lib/app-bar';
import WithFalcor from './';
import getShallowInstance from 'utils/shallow';

test( 'WithFalcor', t => {
  let expected;
  let actual;

  t.plan( 1 );

  const Wrapped = WithFalcor( 'div', () => {}, '' );
  const instance = getShallowInstance( <Wrapped /> );

  expected = 'div';
  actual = instance.type;
  t.equals( actual, expected, 'renders the HOC' );
});

