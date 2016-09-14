import { PropTypes } from 'react';
import reactStamp from 'react-stamp';
import { fromJS, List, Repeat } from 'immutable';
import Editor from 'draft-js-plugins-editor';
import {
  EditorState,
  ContentState,
  ContentBlock,
  convertFromHTML,
  convertToRaw,
  convertFromRaw,
  RichUtils,
  Modifier,
  BlockMapBuilder,
  genKey,
  CharacterMetadata,
} from 'draft-js';

function insertFragment(editorState, fragment, entityMap) {
  var newContent = Modifier.replaceWithFragment(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    fragment
  );

  return EditorState.push(
    editorState,
    newContent,
    'insert-fragment'
  );
}

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
    const content = convertFromRaw(this.props.content);
    this.state = {
      editor: EditorState.createWithContent(content),
      readOnly: true,
    };

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handlePastedText = this.handlePastedText.bind(this);

    this.save = this.save.bind(this);
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
      this._timeout = setTimeout(this.save, 3000);
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

  handleKeyCommand(command) {
    const { editor } = this.state;
    const newState = RichUtils.handleKeyCommand(editor, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  },

  handleReturn(e) {
    const { editor } = this.state;
    const selection = editor.getSelection();
    const content = editor.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey());

    // We only care if there is no current selection (e.g. selection is a caret).
    if (!selection.isCollapsed()) {
      console.log("not collapsed")
      return;
    }

    // We only care if we're at the end of the line.
    // TODO: implement splitting current block at selection
    if (block.getLength() !== selection.getStartOffset()) {
      console.log("not at end of line")
      return;
    }

    const previousBlock = content.getBlockBefore(block.getKey());
    if (block.getText().length === 0) {
      if (!previousBlock || previousBlock.getText().length === 0) {
        // no empty lines between paragraphs
        return true;
      } else {
        // insert header block
        this._insertHeader();
        return true;
      }
    } else if (block.getType() === 'unstyled') {
      // current line is non-empty and is unstyled already, so let the browser do its thing and
      // insert another one.
      return false;
    } else {
      // non-empty and not unstyled, so let's insert a new paragraph and move the cursor there.
      this._insertParagraph();
      return true;
    }
  },

  _insertParagraph () {
    return this._insertBlock({
      key: genKey(),
      type: 'unstyled',
      text: '',
      characterList: List()
    });
  },

  _insertBlock (blockData) {
    const { editor } = this.state;
    const selection = editor.getSelection();
    const content = editor.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey());

    // Insert new unstyled block
    const newBlock = new ContentBlock(blockData);

    const blockArr = [];
    content.getBlockMap().forEach((oldBlock, key) => {
      blockArr.push(oldBlock);

      if (key === block.getKey()) {
        blockArr.push(newBlock);
      }
    });

    const newBlockMap = BlockMapBuilder.createFromArray(blockArr);

    const newContent = content.merge({
      blockMap: newBlockMap,
      selectionBefore: selection,
      selectionAfter: selection.merge({
        anchorKey: newBlock.getKey(),
        anchorOffset: 0,
        focusKey: newBlock.getKey(),
        focusOffset: 0,
        isBackward: false,
      }),
    });

    const newState = EditorState.push(editor, newContent, 'insert-fragment');

    this.setState({ editor: newState });
  },

  handlePastedText(text, html) {
    if (html) {
      const htmlFrag = convertFromHTML(html);
      if (htmlFrag) {
        const ALLOWED_STYLE = ['ITALIC', 'BOLD'];
        const contentBlocks = htmlFrag.map(block => {
          const characterList = block.getCharacterList().map(list => {
            const styles = list.getStyle().filter(s => {
              return ALLOWED_STYLE.indexOf(s) !== -1;
            });
            return list.set('style', styles);
          });
          return block.set('type', 'unstyled').set('characterList', characterList);
        });

        const htmlMap = BlockMapBuilder.createFromArray(contentBlocks);

        const newState = insertFragment(this.state.editor, htmlMap);
        this.setState({ editor: newState });

        return true;
      }
    }
  },

  render() {
    const isReadOnly = this.props.readOnly ? true : this.state.readOnly;
    return (
      <div onClick={this.onClick}>
        <span style={{ fontSize: 12, color: '#555' }}>{isReadOnly ? 'Reading' : 'Writing'}</span>
        <Editor
          ref="upstream"
          editorState={this.state.editor}
          plugins={this.props.plugins}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          readOnly={isReadOnly}

          handleKeyCommand={this.handleKeyCommand}
          handleReturn={this.handleReturn}
          handlePastedText={this.handlePastedText}
        />
      </div>
    );
  },
});

export default EditorComponent;
