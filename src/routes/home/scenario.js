import test from 'tape';
import browser from '../../../wdio';

test( 'Home page title', async t => {
  t.plan( 1 );
  await browser.url( '/' );

  const expectedTitle = 'StoryShop';
  const actual = await browser.getTitle();

  t.equals( actual, expectedTitle, 'has correct page title' );
  t.end();
});

test( 'Home page header', async t => {
  t.plan( 1 );

  await browser.url( '/' );
  await browser.pause( 1000 );

  const expected = 'Home';
  const actual = await browser.getText( '.home-header' );
  t.equals( actual, expected, 'has page header' );
  t.end();
});

