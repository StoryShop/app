import reactStamp from 'react-stamp';
import * as draft from 'draft-js';
import { List, Repeat } from 'immutable';
import insertFragmentIntoContentState from 'draft-js/lib/insertFragmentIntoContentState'
import {
  Editor,
  EditorState,
  ContentState,
  ContentBlock,
  convertToRaw,
  convertFromRaw,
  getDefaultKeyBinding,
  KeyBindingUtil,
  RichUtils,
  Modifier,
  BlockMapBuilder,
  genKey,
  CharacterMetadata,
} from 'draft-js';

const { hasCommandModifier } = KeyBindingUtil;

export default ( React, ...behaviours ) => reactStamp( React ).compose({
  propTypes: {
    placeholder: React.PropTypes.string,
    delay: React.PropTypes.number,
  },

  defaultProps: {
  },

  init () {
    let content;

    if ( this.props.value && this.props.value.blocks[0].text != '' ) {
      content = ContentState.createFromBlockArray( convertFromRaw( this.props.value ) );
    } else {
      const text = 'Section Header';
      content = ContentState.createFromBlockArray([
        new ContentBlock({
          key: genKey(),
          type: 'header-two',
          text,
          characterList: List( Repeat( CharacterMetadata.EMPTY, text.length ) )
        }),
      ]);
    }

    this.state = { editor: EditorState.createWithContent( content ) };
  },

  componentDidMount () {
    this.refs.editor.focus();
  },

  /**
   * When the input value changes by the user, update the state of the controlled component and
   * begin a timeout to update the model.
   */
  _onChange ( editor ) {
    this.setState({ editor });

    this._endTimeout();
    this._startTimeout( editor );
  },

  focus () {
    this.refs.editor.focus();
  },

  /**
   * Persist the changes through the callback.
   */
  _save ( editor ) {
    if ( this.props.onChange ) {
      this.props.onChange( convertToRaw( editor.getCurrentContent() ), editor );
    }
  },

  /**
   * Create a new timeout using the delay from props, or 500ms if none is provided, after which we
   * can trigger the callback provided through props.
   */
  _startTimeout ( editor ) {
    const delay = this.props.delay || 3000;
    this._changeTimeout = setTimeout( () => this._save( editor ), delay );
  },

  /**
   * Cancel the timeout, if it exists.
   */
  _endTimeout () {
    if ( this._changeTimeout ) {
      clearTimeout( this._changeTimeout );
      delete this._changeTimeout;
    }
  },

  /**
   * Ensure we clean up the timeout.
   */
  componentWillUnmount () {
    this._endTimeout();
  },

  _keyBindings ( e ) {
    if ( ( e.keyCode === 49 || e.keyCode === 97 ) && hasCommandModifier( e ) ) {
      return 'header';
    }

    if ( ( e.keyCode === 48 || e.keyCode === 96 ) && hasCommandModifier( e ) ) {
      return 'unstyled';
    }

    return getDefaultKeyBinding( e );
  },

  _handleKeyCommand ( command ) {
    const { editor } = this.state;
    let newState;

    switch ( command ) {
      case 'header':
        newState = RichUtils.toggleBlockType( this.state.editor, 'header-two' );
        break;
      case 'unstyled':
        newState = RichUtils.toggleBlockType( this.state.editor, 'unstyled' );
        break;
      default:
        newState = RichUtils.handleKeyCommand( editor, command );
    }

    if ( newState ) {
      this._onChange( newState );
      return true;
    }

    return false;
  },

  _handleReturn ( e ) {
    const { editor } = this.state;
    const selection = editor.getSelection();
    const content = editor.getCurrentContent();
    const block = content.getBlockForKey( selection.getStartKey() );

    // We only care if there is no current selection (e.g. selection is a caret).
    if ( ! selection.isCollapsed() ) {
      console.log("not collapsed")
      return;
    }

    // We only care if we're at the end of the line.
    // TODO: implement splitting current block at selection
    if ( block.getLength() !== selection.getStartOffset() ) {
      console.log("not at end of line")
      return;
    }

    const previousBlock = content.getBlockBefore( block.getKey() );
    if ( block.getText().length === 0 ) {
      if ( ! previousBlock || previousBlock.getText().length === 0 ) {
        // no empty lines between paragraphs
        return true;
      } else {
        // insert header block
        this._insertHeader();
        return true;
      }
    } else if ( block.getType() === 'unstyled' ) {
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

  _insertHeader () {
    const newState = RichUtils.toggleBlockType( this.state.editor, 'header-two' );
    this.setState({ editor: newState });
  },

  _insertBlock ( blockData ) {
    const { editor } = this.state;
    const selection = editor.getSelection();
    const content = editor.getCurrentContent();
    const block = content.getBlockForKey( selection.getStartKey() );

    // Insert new unstyled block
    const newBlock = new ContentBlock( blockData );

    const blockArr = [];
    content.getBlockMap().forEach( ( oldBlock, key ) => {
      blockArr.push( oldBlock );

      if ( key === block.getKey() ) {
        blockArr.push( newBlock );
      }
    });

    const newBlockMap = BlockMapBuilder.createFromArray( blockArr );

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

    const newState = EditorState.push( editor, newContent, 'insert-fragment' );

    this.setState({ editor: newState });
  },

  render () {
    const { onChange, value, ...props } = this.props;
    const { editor } = this.state;

    const styles = {
      unstyled: {
        marginBottom: 20,
      },
    };

    window.editor = editor;
    window.draft = draft;

    return (
      <Editor
        ref="editor"
        editorState={editor}
        onChange={e => this._onChange( e )}
        keyBindingFn={ e => this._keyBindings( e ) }
        handleKeyCommand={c => this._handleKeyCommand( c )}
        handleReturn={e => this._handleReturn( e )}

        {...props}
      />
    );
  },
}, ...behaviours );

