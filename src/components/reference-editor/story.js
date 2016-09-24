import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import EditorFactory from './';

const Editor = EditorFactory()(React);

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

storiesOf('Reference Editor', module)
  .add('default', () => {
    const initialContent = genContent('Here we go');
    return (
      <Editor
        content={initialContent}
        onSearchChange={action('onSearchChange')}
        searchSuggestions={[
          { type: 'character', _id: '1', name: 'Abc', link: '123', avatar: 'https://sigil.cupcake.io/Abc' },
          { type: 'element', _id: '2', name: 'Zone', link: '42', avatar: 'https://sigil.cupcake.io/Zone' },
        ]}
      />
    );
  });
