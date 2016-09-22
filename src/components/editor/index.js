import { PropTypes } from 'react';
import reactStamp from 'react-stamp';
import { fromJS, List, Repeat } from 'immutable';
import Editor from 'draft-js-plugins-editor';
import {
  EditorState,
  ContentBlock,
  convertFromRaw,
  RichUtils,
  BlockMapBuilder,
  genKey,
  CharacterMetadata,
} from 'draft-js';

import stripPastePluginFactory from './paste-plugin';

const stripPastePlugin = stripPastePluginFactory();

const EditorComponent = (React, ...behaviours) => reactStamp(React).compose({
  propTypes: {
    content: PropTypes.shape({
      entityMap: PropTypes.object.isRequired,
      blocks: PropTypes.array.isRequired,
    }).isRequired,

    onEditStart: PropTypes.func,
    onEditEnd: PropTypes.func,
    onChange: PropTypes.func,

    readOnly: PropTypes.bool,
    plugins: PropTypes.array,
  },

  init() {
    this.state = {
      editor: EditorState.createWithContent( convertFromRaw( this.props.content ) ),
      readOnly: true,
    };
  },

  componentWillUnmount() {
    this.deleteTimeout();
    this.save();
  },

  onClick() {
    this.setState({ readOnly: false }, () => {
      this.refs.upstream && this.refs.upstream.focus();
    });
  },

  _focus() {
    this.refs.upstream.focus();
  },

  onFocus() {
    if (this.props.onEditStart) {
      this.props.onEditStart();
    }
  },

  onBlur() {
    this.setState({ readOnly: true });
    if (this.props.onEditEnd) {
      this.props.onEditEnd();
    }
  },

  onChange(editor) {
    if (this.props.readOnly) {
      return;
    }

    this.setState({ editor });

    if (this.props.onChange) {
      this.deleteTimeout();
      this._timeout = setTimeout(::this.save, 3000);
    }
  },

  deleteTimeout() {
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  },

  save() {
    if (this.props.onChange) {
      this.props.onChange(this.state.editor.getCurrentContent());
    }
  },

  render() {
    const { plugins = [] } = this.props;
    const isReadOnly = this.props.readOnly ? true : this.state.readOnly;

    return (
      <div onClick={::this.onClick}>
        <Editor
          ref="upstream"
          editorState={this.state.editor}
          plugins={[ ...plugins, stripPastePlugin ]}
          onChange={::this.onChange}
          onFocus={::this.onFocus}
          onBlur={::this.onBlur}
          readOnly={isReadOnly}
        />
      </div>
    );
  },
});

export default EditorComponent;
