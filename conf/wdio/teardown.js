import test from 'tape';
import browser from './';

test( 'Shutdown wdio', t => {
  browser.end();
  t.end();
});

