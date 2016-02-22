import React from 'react';
import test from 'tape';
import { App } from './';
import getShallowInstance from 'utils/shallow';

test( 'App Render Method', t => {
  t.plan( 1 );

  const instance = getShallowInstance( <App />, { router: { isActive: () => true } } );
  
  // FIXME(jdm): This test requires knowing what DocumentTitle renders.
  const expected = 'SideEffect(Component)';
  const actual = instance.type.displayName;

  t.equals( actual, expected, 'rendered the DocumentTitle element' );
});

