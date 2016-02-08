import React from 'react';
import test from 'tape';
import { App, resolve } from './';
import getShallowInstance from '../../../utils/shallow';

test( 'App Render Method', t => {
  t.plan( 1 );

  const instance = getShallowInstance( <App /> );
  
  const expected = 'div';
  const actual = instance.type;

  t.equals( actual, expected, 'rendered a div' );
});

test( 'App Falcor Resolve', t => {
  t.plan( 1 );

  const json = {
    people: {
      0: {
        name: "Seth"
      },
      1: {
        name: "Josh"
      },
    }
  };

  const expected = { names: 'Seth and Josh' };
  const actual = resolve( json );

  t.deepEqual( actual, expected, 'should join names from array of people' );
});

