import test from 'tape';
import browser from '../../wdio';

test( 'Left Nav', async t => {
  let actual, expected;

  t.plan( 3 );

  await browser.url( '/' );
  await browser.click( '.app-bar > button' );

  await browser.pause( 250 );

  expected = true;
  actual = await browser.isVisibleWithinViewport( '.main-menu' );
  t.equals( actual, expected, 'opens menu on navbar icon click' );

  await browser.click( '.main-menu__item-characters' );
  await browser.pause( 250 );

  expected = 'Characters | StoryShop';
  actual = await browser.getTitle();
  t.equals( actual, expected, 'navigates to selected page' );

  expected = false;
  actual = await browser.isVisibleWithinViewport( '.main-menu' );
  t.equals( actual, expected, 'closes menu on item click' );

  t.end();
});

