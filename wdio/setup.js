import test from 'tape';
import browser from './';

test( 'Start wdio', t => {
  browser.init().then( () => t.end() );
});

