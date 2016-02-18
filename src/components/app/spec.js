import React from 'react';
import test from 'tape';
import { App } from './';
import getShallowInstance from '../../../utils/shallow';

test( 'App Render Method', t => {
  t.plan( 1 );

  const instance = getShallowInstance( <App /> );
  
  const expected = 'div';
  const actual = instance.type;

  t.equals( actual, expected, 'rendered a div' );
});

