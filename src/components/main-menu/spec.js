import React from 'react';
import test from 'tape';
import MainMenu from './';
import LeftNav from 'material-ui/lib/left-nav';
import getShallowInstance from 'utils/shallow';

test( 'MainMenu', t => {
  let expected, actual;
  t.plan( 1 );

  const worlds = { 0: { id: '123' } };
  const instance = getShallowInstance(
    <MainMenu currentWorld={worlds[0]} worlds={worlds} />,
    { router: { isActive: () => true } }
  );
  
  expected = LeftNav;
  actual = instance.type;
  t.equals( actual, expected, 'rendered an MUI LeftNav' );
});

