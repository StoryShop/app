import test from 'tape';
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
import { is, fromJS, List, Repeat, Record } from 'immutable';

import stripPastePluginFactory from './';

const genBlock = (text, { key, style, type = 'unstyled' } = {}) => {
  let newStyle = CharacterMetadata.EMPTY;
  if (style) {
    newStyle = CharacterMetadata.applyStyle(newStyle, style);
  }

  return new ContentBlock({
    key,
    type,
    text,
    characterList: List(Repeat(newStyle, text.length))
  });
};
const genContent = (text) => {
  const contentState = ContentState.createFromBlockArray([
    genBlock(text, { key: 'abc' }),
  ]);
  return convertToRaw(contentState);
};

const stateFromRaw = (raw) => {
  return EditorState.createWithContent(convertFromRaw(raw));
}

test('StripPastePlugin strips all markup but italics and bolds', t => {
  t.plan(1);

  const convert = () => {
    return ([
      genBlock('boldy', { style: 'BOLD', key: 'b' }),
      genBlock('yo', { type: 'header-two', key: 'h' }),
    ]);
  };

  const stripPastePlugin = stripPastePluginFactory(convert);

  const initialContent = stateFromRaw(genContent('Starter'));
  const resultingContent = stateFromRaw(convertToRaw(ContentState.createFromBlockArray([
    genBlock('boldy', { style: 'BOLD', key: 'b' }),
    genBlock('yoStarter', { key: 'h' }),
  ])));

  const mocks = { setState: () => {} };
  const setEditorState = spy(mocks, 'setState');
  const getEditorState = () => initialContent;

  stripPastePlugin.handlePastedText(null, 'test', { getEditorState, setEditorState: mocks.setState });

  const blocksData = (state) => {
    return JSON.stringify(convertToRaw(state).blocks.map(({ key, ...rest }) => rest));
  };

  const finalContent = blocksData(setEditorState.calls[0].args[0].getCurrentContent());
  const result = blocksData(resultingContent.getCurrentContent());
  t.equals(finalContent, result, 'Sets processed state');
});
