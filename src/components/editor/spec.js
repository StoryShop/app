import React from 'react';
import test from 'tape';
import { shallow, mount } from 'enzyme';
import spy from 'utils/spy';

import {
  EditorState,
  ContentState,
  ContentBlock,
  CharacterMetadata,
  convertToRaw,
  convertFromRaw,
  genKey,
} from 'draft-js';
import { is, fromJS, List, Repeat } from 'immutable';

import EditorFactory from './';
import UpstreamEditor from 'draft-js-plugins-editor';

const genContent = (text) => {
  const contentState = ContentState.createFromBlockArray([
    new ContentBlock({
      key: 'abc',
      type: 'unstyled',
      text,
      characterList: List(Repeat(CharacterMetadata.EMPTY, text.length))
    }),
  ]);
  return convertToRaw(contentState);
};

const stateFromRaw = (raw) => {
  return EditorState.createWithContent(convertFromRaw(raw));
}

const getState = (el) => {
  return el.find('span').text();
};

test('Editor status', t => {
  const Editor = EditorFactory(React);
  t.plan(3);

  const content = genContent('Write here');
  const instance = shallow(<Editor content={content} />);

  t.equals(getState(instance), 'Reading');
  t.equals(instance.find(UpstreamEditor).length, 1);

  instance.simulate('click');

  t.equals(getState(instance), 'Writing');
});

test('Editor read-only status', t => {
  const Editor = EditorFactory(React);
  t.plan(3);

  const content = genContent('Write here');
  const instance = shallow(<Editor content={content} readOnly />);

  t.equals(getState(instance), 'Reading');
  t.equals(instance.find(UpstreamEditor).length, 1);

  instance.simulate('click');

  t.equals(getState(instance), 'Reading');
});

test('Editor is not managed', t => {
  const Editor = EditorFactory(React);
  t.plan(2);

  const content = genContent('This');
  const instance = shallow(<Editor content={content} />);

  const expContent = convertFromRaw(content);
  let currContent = instance.find(UpstreamEditor).props().editorState.getCurrentContent();

  t.equals(is(currContent, expContent), true);

  instance.setProps({ content: genContent('New') });

  currContent = instance.find(UpstreamEditor).props().editorState.getCurrentContent();
  t.equals(is(currContent, expContent), true);
});

test('Editor lifecycle', t => {
  const Editor = EditorFactory(React);
  t.plan(4);

  const content = genContent('Write here');
  const mocks = { onStart: () => {}, onEnd: () => {} };
  const onEditStart = spy(mocks, 'onStart');
  const onEditEnd = spy(mocks, 'onEnd');
  const instance = shallow(<Editor content={content} onEditStart={mocks.onStart} onEditEnd={mocks.onEnd} />);

  t.equals(onEditStart.calls.length, 0);
  t.equals(onEditEnd.calls.length, 0);

  instance.instance().onFocus();

  t.equals(onEditStart.calls.length, 1);

  instance.instance().onBlur();

  t.equals(onEditEnd.calls.length, 1);
});
