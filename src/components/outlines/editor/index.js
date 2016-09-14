import React, { PropTypes } from 'react';
import reactStamp from 'react-stamp';
import EditorFactory from 'components/editor';
import { fromJS, List, Repeat } from 'immutable';
import 'draft-js-mention-plugin/lib/plugin.css';
import {
  ContentState,
  ContentBlock,
  convertToRaw,
  convertFromRaw,
  genKey,
  CharacterMetadata,
} from 'draft-js';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';

const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;

const Editor = EditorFactory(React);

export default ( React, ...behaviours ) => reactStamp( React ).compose({
  propTypes: {
    placeholder: React.PropTypes.string,
    delay: React.PropTypes.number,
    suggestions: React.PropTypes.array,
  },

  init () {
    let content;

    if ( this.props.value && this.props.value.blocks[0].text != '' ) {
      const em = this.props.value.entityMap;
      Object.getOwnPropertyNames( em ).forEach( k => {
        em[ k ].data.mention = fromJS( em[ k ].data.mention );
      });

      content = this.props.value;
    } else {
      const text = 'Write here';
      const contentState = ContentState.createFromBlockArray([
        new ContentBlock({
          key: genKey(),
          type: 'unstyled',
          text,
          characterList: List( Repeat( CharacterMetadata.EMPTY, text.length ) )
        }),
      ]);
      content = convertToRaw(contentState);
    }

    this.state = {
      content,
      suggestions: fromJS(this.props.suggestions || []),
    };
  },

  /**
   * When the input value changes by the user, update the state of the controlled component and
   * begin a timeout to update the model.
   */
  _onChange ( content ) {
    this.setState({ content });
    this._save(content);
  },

  /**
   * Persist the changes through the callback.
   */
  _save ( content ) {
    if ( this.props.onChange ) {
      this.props.onChange( convertToRaw( content ), content );
    }
  },

  onSearchChange ({ value }) {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, fromJS( this.props.suggestions || [])),
    });
  },

  render () {
    const { onChange } = this.props;
    const { suggestions } = this.state;
    const plugins = suggestions.size ? [ mentionPlugin ] : [];

    return (
      <div>
        <Editor
          content={this.state.content}
          plugins={plugins}
          onChange={e => this._onChange( e )}
        />
        <MentionSuggestions
          onSearchChange={ o => this.onSearchChange(o) }
          suggestions={ suggestions }
        />
      </div>
    );
  },
}, ...behaviours );

