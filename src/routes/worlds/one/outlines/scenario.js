import test from 'tape';
import browser from '../../../../../wdio';
import ids from '../../../../../build/ids.json';

test( 'Outlines Placeholder Route', async t => {
  t.plan( 1 );

  await browser.url( `/worlds/${ids.world1}/outlines` );
  await browser.pause( 50 );

  const expected = 'Outlines';
  const actual = await browser.getText( '.header' );
  t.equals( actual, expected, 'has page header' );
  t.end();
});

