import React from 'react';
import TestUtils from 'react-addons-test-utils';
import test from 'tape';
import EditorFactory from './';
import UpstreamEditor from 'draft-js-plugins-editor';
import getShallowInstance from 'utils/shallow';

const getState = (el) => {
  if (el.type === 'span') {
    return el.props.children;
  }
};

test('Editor', t => {
  const Editor = EditorFactory(React);
  t.plan(2);

  let instance = getShallowInstance(<Editor />);

  t.equals(getState(instance.props.children[0]), 'Reading');
  t.equals(instance.props.children[1].type, UpstreamEditor);
});
