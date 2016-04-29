import React from 'react';
import test from 'tape';
import Jumbotron from './';
import { FlexLayout } from 'components/flex';
import getShallowInstance from 'utils/shallow';

test( 'Jumbotron', t => {
  let expected, actual;
  t.plan( 2 );

  const world = {
    worldId: '123',
    title: 'Sesame Street',
    outlines: 3,
    elements: 4,
    characters: 5,
  };

  const instance = getShallowInstance( <Jumbotron {...world} /> );

  expected = FlexLayout;
  actual = instance.type;
  t.equals( actual, expected, 'rendered a flex layout' );

  expected = 'world-jumbotron';
  actual = instance.props.element.props.className;
  t.equals( actual, expected, 'passes a div to FlexElement with a class of `world-jumbotron`' );
});

