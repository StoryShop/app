import React from 'react';
import test from 'tape';
import ComponentSummary from './';
import { FlexLayout } from 'components/flex';
import getShallowInstance from 'utils/shallow';

test( 'ComponentSummary', t => {
  let expected, actual;
  t.plan( 3 );

  const props = {
    outlines: 5,
    elements: 6,
    characters: 7,
    worldId: '123',
  };
  const instance = getShallowInstance( <ComponentSummary {...props} /> );
  
  expected = FlexLayout;
  actual = instance.type;
  t.equals( actual, expected, 'rendered a FlexLayout' );

  expected = 'div';
  actual = instance.props.element.type;
  t.equals( actual, expected, 'passes a div to FlexLayout' );

  expected = 'component-summary';
  actual = instance.props.element.props.className;
  t.equals( actual, expected, 'passes a div to FlexElement with a class of `component-summary`' );
});

