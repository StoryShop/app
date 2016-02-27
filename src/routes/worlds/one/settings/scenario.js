import test from 'tape';
import browser from '../../../../../wdio';
import ids from '../../../../../build/ids.json';

test( 'World Settings Route', async t => {
  let actual, expected;
  t.plan( 5 );

  await browser.url( `/worlds/${ids.world1}` );
  await browser.pause( 50 );

  expected = 'Sesame Street';
  actual = await browser.getText( '.world-jumbotron h1' );
  t.equals( actual, expected, 'displays world header in jumbotron' );

  const { value: circles } = await browser.elements( '.component-summary--circle' );
  expected = 3;
  actual = circles.length;
  t.equals( actual, expected, 'shows three circles in the component summary' );

  expected = '1';
  actual = await browser.elementIdText( circles[0].ELEMENT ).then( e => e.value );
  t.equals( actual, expected, 'should show the correct number of outlines' );

  expected = '1';
  actual = await browser.elementIdText( circles[1].ELEMENT ).then( e => e.value );
  t.equals( actual, expected, 'should show the correct number of elements' );

  expected = '1';
  actual = await browser.elementIdText( circles[2].ELEMENT ).then( e => e.value );
  t.equals( actual, expected, 'should show the correct number of characters' );

  t.end();
});

