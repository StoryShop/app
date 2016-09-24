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
import UpstreamEditorFactory from 'components/editor';

const UpstreamEditor = UpstreamEditorFactory(React);

test('ReferenceEditor', t => {
  const mentionPlugin = { MentionSuggestions: () => (<div />) };
  const undoPlugin = {};
  const linkifyPlugin = {};

  const Editor = EditorFactory({ Editor: UpstreamEditor, mentionPlugin, undoPlugin, linkifyPlugin })(React);
  let instance, actual, expected;

  const content = {};

  instance = shallow(<Editor content={content} searchSuggestions={[]} />);

  {
    const upstream = instance.find(UpstreamEditor).at(0);
    t.ok(upstream, 'should render the editor');
  }

  {
    const upstream = instance.find(UpstreamEditor).at(0);
    const plugins = upstream.props().plugins;
    t.notEquals(plugins.indexOf(mentionPlugin), -1, 'should manage mention plugin');
    t.notEquals(plugins.indexOf(undoPlugin), -1, 'should manage undo plugin');
    t.notEquals(plugins.indexOf(linkifyPlugin), -1, 'should manage linkify plugin');
  }

  {
    const onSearchChange = () => {};
    const searchSuggestions = [];
    instance = shallow(<Editor content={content} onSearchChange={onSearchChange} searchSuggestions={searchSuggestions} />);
    const suggestions = instance.children().at(1);

    t.ok(suggestions, 'renders suggestion list');
    t.equals(suggestions.props().onSearchChange, onSearchChange, 'passed search callback down');
    t.equals(suggestions.props().suggestions, searchSuggestions, 'passes suggestion list down');
  }

  t.end();
});
