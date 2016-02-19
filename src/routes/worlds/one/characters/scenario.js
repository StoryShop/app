import test from 'tape';
import browser from '../../../../../wdio';

test( 'Characters Placeholder Route', async t => {
  t.plan( 1 );

  await browser.url( '/worlds/123/characters' );
  await browser.pause( 1000 );

  const expected = 'Characters';
  const actual = await browser.getText( '.header' );
  t.equals( actual, expected, 'has page header' );
  t.end();
});

