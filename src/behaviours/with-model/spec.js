import React from 'react';
import test from 'tape';
import reactStamp from 'react-stamp';
import AppBar from 'material-ui/lib/app-bar';
import withModel from './';
import getShallowInstance from 'utils/shallow';

test( 'WithModel', t => {
  let expected;
  let actual;

  t.plan( 1 );

  const Component = reactStamp( React ).compose({ render () { return <div />; } }, withModel );
  const instance = getShallowInstance( <Component /> );

  expected = 'div';
  actual = instance.type;
  t.equals( actual, expected, 'renders the component' );
});

