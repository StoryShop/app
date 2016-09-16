import React from 'react';
import test from 'tape';
import Autoprefix from './';
import getShallowInstance from 'utils/shallow';

test( 'Autoprefix HOC', t => {
  t.plan( 1 );

  const Component = () => <div>Hello</div>;
  const WrappedComponent = Autoprefix( Component );

  const result = getShallowInstance( <WrappedComponent style={{ display: 'flex' }} /> );
  const actual = result.props.style;
  const expected = {
    display: [ '-webkit-box', '-ms-flexbox', 'flex' ],
  };

  t.deepEquals( actual, expected, 'should prefix CSS properties' );
});

