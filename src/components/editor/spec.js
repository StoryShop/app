import React from 'react';
import test from 'tape';
import { shallow, mount } from 'enzyme';
import spy, { createSpy } from '../../utils/spy';

import {
  EditorState,
  ContentState,
  ContentBlock,
  CharacterMetadata,
  convertToRaw,
  convertFromRaw,
  genKey,
} from 'draft-js';

import EditorFactory from './';
import UpstreamEditor from 'draft-js-plugins-editor';

const Editor = EditorFactory(React);

test('Editor', t => {
  let instance, actual, expected, editor;

  const content = {
    entityMap: {},
    blocks: [{ text: '' }],
  };

  instance = shallow( <Editor content={content} /> );

  /**
   * Default state
   */
  {
    let editor = instance.find( UpstreamEditor ).at( 0 );
    t.ok( editor, 'should render a Draft Plugins Editor' );
    t.ok( editor.props().readOnly, 'should start in readOnly mode' );
  }

  /**
   * Writable on click
   */
  {
    instance.simulate( 'click' );

    let editor = instance.find( UpstreamEditor ).at( 0 );
    t.notOk( editor.props().readOnly, 'should move to writable mode on click' );
  }

  /**
   * Read only
   */
  {
    instance = shallow( <Editor content={content} readOnly={true} /> );
    instance.simulate( 'click' );

    let editor = instance.find( UpstreamEditor ).at( 0 );
    t.ok( editor.props().readOnly, 'should not move to writeable on click if read only' );
  }

  /**
   * Lifecycle methods
   */
  {
    let onEditStartSpy = createSpy();
    let onEditEndSpy = createSpy();

    instance = shallow(
      <Editor
        content={content}
        onEditStart={onEditStartSpy}
        onEditEnd={onEditEndSpy}
      />
    );

    t.equals( onEditStartSpy.calls.length, 0, 'onEditStart is not called initially');
    t.equals( onEditEndSpy.calls.length, 0, 'onEditEnd is not called initially');

    instance.instance().onFocus();
    t.equals(onEditStartSpy.calls.length, 1, 'onEditStart is called after focusing in');

    instance.instance().onBlur();
    t.equals(onEditEndSpy.calls.length, 1, 'onEditEnd is called after blurring out');
  }

  t.end();
});

