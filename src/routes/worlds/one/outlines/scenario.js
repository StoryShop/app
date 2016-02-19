import test from 'tape';
import browser from '../../../../../wdio';

test( 'Outlines Placeholder Route', async t => {
  t.plan( 1 );

  await browser.url( '/worlds/123/outlines' );
  await browser.pause( 1000 );

  const expected = 'Outlines';
  const actual = await browser.getText( '.header' );
  t.equals( actual, expected, 'has page header' );
  t.end();
});

