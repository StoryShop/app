import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import EditorFactory from './';

const Editor = EditorFactory(React);

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

storiesOf('Editor', module)
  .add('default', () => {
    const initialContent = genContent('Here we go');
    return (
      <Editor
        content={initialContent}
        onEditStart={action('onEditStart')}
        onEditEnd={action('onEditEnd')}
        onChange={action('onChange')}
      />
    );
  })
  .add('read-only', () => {
    const initialContent = genContent('Here we go');
    return (
      <Editor
        content={initialContent}
        onEditStart={action('onEditStart')}
        onEditEnd={action('onEditEnd')}
        onChange={action('onChange')}
        readOnly
      />
    );
  });
