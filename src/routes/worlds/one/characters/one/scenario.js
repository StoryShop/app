import test from 'tape';
import browser from '../../../../../../wdio';
import ids from '../../../../../../build/ids.json';

test( 'Characters Placeholder Route', async t => {
  t.plan( 1 );

  await browser.url( `/worlds/${ids.world1}/characters/${ids.character1}` );
  await browser.pause( 50 );

  const expected = `Big Bird (Character)`;
  const actual = await browser.getText( '.app-bar h1' );
  t.equals( actual, expected, 'has character name in app bar' );
  t.end();
});

