import React from 'react';
import test from 'tape';
import Home from './';
import getShallowInstance from 'utils/shallow';

test( 'Home Render Method', t => {
  t.plan( 1 );

  const instance = getShallowInstance( <Home /> );
  
  const expected = 'div';
  const actual = instance.type;

  t.equals( actual, expected, 'rendered a div' );
});

