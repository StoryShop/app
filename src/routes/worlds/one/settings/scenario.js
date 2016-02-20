import test from 'tape';
import browser from '../../../../../wdio';

test( 'Settings Placeholder Route', async t => {
  t.plan( 1 );

  await browser.url( '/worlds/123' );
  await browser.pause( 50 );

  const expected = 'Settings';
  const actual = await browser.getText( '.header' );
  t.equals( actual, expected, 'has page header' );
  t.end();
});

