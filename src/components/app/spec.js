import React from 'react';
import test from 'tape';
import AppFactory from './';
import getShallowInstance from 'utils/shallow';

test( 'App Render Method', t => {
  t.plan( 1 );

  const App = AppFactory( React );
  const instance = getShallowInstance( <App /> );
  
  // FIXME(jdm): This test requires knowing what DocumentTitle renders.
  const expected = 'SideEffect(Component)';
  const actual = instance.type.displayName;

  t.equals( actual, expected, 'rendered the DocumentTitle element' );
});

