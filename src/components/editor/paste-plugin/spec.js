import test from 'tape';
import spy, { createSpy } from '../../../utils/spy';

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

test( 'StripPastePlugin', t => {
  let plugin, actual, expected, result, convertSpy;

  const html = '<p>does not matter</p>';

  const initalContentState = ContentState.createFromBlockArray([
    new ContentBlock({
      key: 'initial',
      type: 'unstyled',
      text: 'Initial',
      characterList: List( Repeat( CharacterMetadata.EMPTY, 7 ) ),
    }),
  ]);
  const initialEditorState = EditorState.createWithContent( initalContentState );

  const mocks = {
    setEditorState: () => {},
    getEditorState: () => initialEditorState,
  };
  const setEditorStateSpy = spy( mocks, 'setEditorState' );
  const getEditorStateSpy = spy( mocks, 'getEditorState' );

  convertSpy = createSpy( () => [
    new ContentBlock({
      key: 'bold',
      type: 'unstyled',
      text: 'bold',
      characterList: List( Repeat( CharacterMetadata.applyStyle( CharacterMetadata.EMPTY, 'BOLD' ), 4 ) ),
    }),
    new ContentBlock({
      key: 'header',
      type: 'header-two',
      text: 'header',
      characterList: List( Repeat( CharacterMetadata.EMPTY, 6 ) ),
    }),
  ]);

  plugin = stripPastePluginFactory( convertSpy );

  /**
   * Ignore Pasted Text
   */
  {
    result = plugin.handlePastedText( null, null, mocks );
    t.notOk( result, 'should return false when no html is provided' );
  }

  /**
   * Process Pasted HTML
   */
  {
    result = plugin.handlePastedText( null, html, mocks );
    t.ok( result, 'should return true' );
    t.equal( convertSpy.calls.length, 1, 'should call convert' );
    t.equal( convertSpy.calls[ 0 ].args[ 0 ], html, 'should call convert with the html' );
    t.equal( setEditorStateSpy.calls.length, 1, 'should call setEditorState' );
  }

  /**
   * Strip Pasted HTML
   */
  {
    let blocks = setEditorStateSpy.calls[ 0 ].args[ 0 ].getCurrentContent().getBlockMap();

    actual = blocks.count();
    expected = 2;
    t.equal( actual, expected, 'should result in two blocks' );

    let firstBlock = blocks.first();
    let secondBlock = blocks.last();

    actual = firstBlock.get( 'text' );
    expected = 'bold';
    t.equals( actual, expected, 'first block should be first block of pasted text' );

    actual = firstBlock.getInlineStyleAt( 0 ).toJS();
    expected = [ 'BOLD' ];
    t.deepEquals( actual, expected, 'pasted bold text should remain bold' );

    actual = secondBlock.get( 'text' );
    expected = 'headerInitial';
    t.equals( actual, expected, 'second block should combine pasted with intial content' );

    actual = secondBlock.get( 'type' );
    expected = 'unstyled';
    t.equals( actual, expected, 'second block should be unstyled' );
  }

  t.end();
});
