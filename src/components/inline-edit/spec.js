import React from 'react';
import test from 'tape';
import InlineEdit from './';
import UpstreamInlineEdit from 'react-inline-edit';
import spy from 'utils/spy';
import { getShallowTree } from 'utils/shallow';

test( 'InlineEdit', t => {
  let expected, actual;
  t.plan( 3 );

  const mocks = { onChange: () => true };
  const onChangeSpy = spy( mocks, 'onChange' );

  const tree = getShallowTree( <InlineEdit delay={0} value='Sesame Street' onChange={mocks.onChange} /> );
  const instance = tree.getRenderOutput();
  const childInlineEdit = tree.subTree( 'InlineEdit' );
  
  expected = UpstreamInlineEdit;
  actual = instance.type;
  t.equals( actual, expected, 'rendered an MUI InlineEdit' );

  expected = 'Sesame Street';
  actual = instance.props.value;
  t.equals( actual, expected, 'passes the value prop upstream' );

  childInlineEdit.props.onChange({ target: { value: 'New Value' } });
  setTimeout( () => {
    expected = 'New Value';
    actual = onChangeSpy.calls[0].args[0];
    t.equals( actual, expected, 'passes changed values to onChange after the timeout' );

    t.end();
  }, 1);
});

