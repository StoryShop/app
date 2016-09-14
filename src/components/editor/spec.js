import React from 'react';
import test from 'tape';
import { shallow, mount } from 'enzyme';

import { ContentState, ContentBlock, CharacterMetadata, convertToRaw, genKey } from 'draft-js';
import { fromJS, List, Repeat } from 'immutable';

import EditorFactory from './';
import UpstreamEditor from 'draft-js-plugins-editor';

const genContent = () => {
  const text = 'Write here';
  const contentState = ContentState.createFromBlockArray([
    new ContentBlock({
      key: genKey(),
      type: 'unstyled',
      text,
      characterList: List( Repeat( CharacterMetadata.EMPTY, text.length ) )
    }),
  ]);
  return convertToRaw(contentState);
};

const getState = (el) => {
  return el.find('span').text();
};

test('Editor', t => {
  const Editor = EditorFactory(React);
  t.plan(4);

  const content = genContent();
  const instance = shallow(<Editor content={content} />);

  t.equals(getState(instance), 'Reading');
  t.equals(instance.find(UpstreamEditor).length, 1);

  instance.simulate('click');

  t.equals(getState(instance), 'Writing');
});
