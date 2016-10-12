import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import spy, { createSpy } from '../../utils/spy';

import EditorFactory, { mentionPlugin, linkifyPlugin, undoPlugin } from './';
import UpstreamEditorFactory from 'components/editor';

const Editor = EditorFactory(React);
const UpstreamEditor = UpstreamEditorFactory(React);

test('ReferenceEditor', t => {
  let instance, actual, expected;

  const content = {};

  instance = shallow(<Editor content={content} searchSuggestions={[]} />);

  {
    const upstream = instance.children().at(0);
    t.ok(upstream, 'should render the editor');

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
