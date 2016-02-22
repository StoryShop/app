import React from 'react';
import test from 'tape';
import MainMenu from './';
import LeftNav from 'material-ui/lib/left-nav';
import getShallowInstance from 'utils/shallow';

test( 'MainMenu', t => {
  let expected, actual;
  t.plan( 1 );

  const instance = getShallowInstance( <MainMenu items={[]} /> );
  
  expected = LeftNav;
  actual = instance.type;
  t.equals( actual, expected, 'rendered an MUI LeftNav' );
});

