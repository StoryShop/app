import test from 'tape';
import browser from '../../../../../wdio';
import ids from '../../../../../build/ids.json';

test( 'Elements Placeholder Route', async t => {
  t.plan( 1 );

  await browser.url( `/worlds/${ids.world1}/elements` );
  await browser.pause( 50 );

  const expected = 'Elements';
  const actual = await browser.getText( '.header' );
  t.equals( actual, expected, 'has page header' );
  t.end();
});

