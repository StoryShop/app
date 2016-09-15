import test from 'tape';
import browser from '../../../../../../conf/wdio';
import ids from '../../../../../utils/ids.json';

test( 'Characters Placeholder Route', async t => {
  t.plan( 1 );

  await browser.url( `/worlds/${ids.world1}/characters` );
  await browser.pause( 50 );

  const expected = 'Characters';
  const actual = await browser.getText( '.app-bar h1' );
  t.equals( actual, expected, 'has page header' );
  t.end();
});

