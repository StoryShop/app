import test from 'tape';
import browser from '../../../../../wdio';
import ids from '../../../../../build/ids.json';
import SettingsPage from './po';

test( 'World Settings Route', async t => {
  const page = SettingsPage( ids.world1 );

  let actual, expected;
  t.plan( 9 );

  await page.go();
  await browser.pause( 50 );

  expected = 'Sesame Street';
  actual = await page.getTitle();
  t.equals( actual, expected, 'displays world header in jumbotron' );

  const circles = await page.getComponentSummaryCircles();
  expected = 3;
  actual = circles.length;
  t.equals( actual, expected, 'shows three circles in the component summary' );

  expected = '4';
  actual = await browser.getText( page.outlinesLinkSelector );
  t.equals( actual, expected, 'should show the correct number of outlines' );

  expected = '23';
  actual = await browser.getText( page.elementsLinkSelector );
  t.equals( actual, expected, 'should show the correct number of elements' );

  expected = '54';
  actual = await browser.getText( page.charactersLinkSelector );
  t.equals( actual, expected, 'should show the correct number of characters' );

  await browser.leftClick( page.outlinesLinkSelector );
  expected = 'Outlines';
  actual = await browser.getText( '.app-bar h1' );
  t.equals( actual, expected, 'outlines circle links to world outlines list' );
  await browser.back();

  await browser.leftClick( page.charactersLinkSelector );
  expected = 'Characters';
  actual = await browser.getText( '.app-bar h1' );
  t.equals( actual, expected, 'characters circle links to world outlines list' );
  await browser.back();

  await browser.leftClick( page.elementsLinkSelector );
  expected = 'Elements';
  actual = await browser.getText( '.app-bar h1' );
  t.equals( actual, expected, 'elements circle links to world outlines list' );
  await browser.back();

  await page.setTitle( 'New Title' );
  await browser.pause( 550 );
  await browser.leftClick( page.outlinesLinkSelector );
  await browser.back();
  expected = 'New Title';
  actual = await page.getTitle();
  t.equals( actual, expected, 'persists title changes to model' );

  t.end();
});

