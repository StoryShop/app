import React from 'react';
import test from 'tape';
import AppBar from './';
import UpstreamAppBar from 'material-ui/lib/app-bar';
import getShallowInstance from 'utils/shallow';

test( 'AppBar', t => {
  let expected, actual;
  t.plan( 2 );

  const instance = getShallowInstance( <AppBar /> );
  
  expected = UpstreamAppBar;
  actual = instance.type;
  t.equals( actual, expected, 'rendered an MUI AppBar' );

  expected = 'StoryShop';
  actual = instance.props.title;
  t.equals( actual, expected, 'passes the default title upstream' );
});

test( 'AppBar with title', t => {
  t.plan( 1 );

  const expected = 'My Title';
  const instance = getShallowInstance( <AppBar title={expected} /> );
  const actual = instance.props.title;

  t.equals( actual, expected, 'passes the provided title upstream' );
});

