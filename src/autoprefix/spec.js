import React from 'react';
import test from 'tape';
import prefix from './';
import getShallowInstance from '../../utils/shallow';

test( 'autoprefix', t => {
  t.plan( 1 );

  const style = {
    display: 'flex',
  };

  const actual = prefix( style );
  
  const expected = {
    display: [ '-webkit-box', '-webkit-flex', '-ms-flexbox', 'flex' ],
  };

  t.deepEquals( actual, expected, 'should prefix CSS properties' );
});

