import test from 'tape';
import browser from '../../../../../wdio';
import ids from '../../../../../build/ids.json';

test( 'Settings Placeholder Route', async t => {
  t.plan( 1 );

  await browser.url( `/worlds/${ids.world1}` );
  await browser.pause( 50 );

  const expected = 'Sesame Street';
  const actual = await browser.getText( '.header' );
  t.equals( actual, expected, 'has page header' );
  t.end();
});

