import React, { PropTypes } from 'react';
import reactStamp from 'react-stamp';

import EditorFactory from 'components/editor';

import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import createUndoPlugin from 'draft-js-undo-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';

import 'draft-js-mention-plugin/lib/plugin.css';
import 'draft-js-undo-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';

import MentionComponent from './mention-text';
import SuggestionsFactory from './suggestions';

export default function ({
  Editor = EditorFactory(React),
  mentionPlugin = createMentionPlugin({ mentionComponent: MentionComponent }),
  undoPlugin = createUndoPlugin(),
  linkifyPlugin = createLinkifyPlugin(),
} = {}) {
  const { MentionSuggestions } = mentionPlugin;
  const Suggestions = SuggestionsFactory(MentionSuggestions);

  return (React, ...behaviours) => reactStamp(React).compose({
    propTypes: {
      onSearchChange: PropTypes.func,
      searchSuggestions: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(['character', 'element']).isRequired,
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      })).isRequired,
    },

    render() {
      const { onSearchChange, searchSuggestions, plugins = [], ...rest } = this.props;
      return (
        <div>
          <Editor
            plugins={[...plugins, mentionPlugin, undoPlugin, linkifyPlugin]}
            {...rest}
          />
          <Suggestions
            onSearchChange={onSearchChange}
            suggestions={searchSuggestions}
          />
        </div>
      );
    },
  });
}
