import {
  EditorState,
  convertFromHTML,
  Modifier,
  BlockMapBuilder,
} from 'draft-js';

const stripPastePlugin = ( convert = convertFromHTML ) => ({
  handlePastedText(text, html, { getEditorState, setEditorState }) {
    if ( ! html ) {
      return;
    }

    const htmlFrag = convert( html );
    if ( ! htmlFrag ) {
      return;
    }

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

    const editorState = getEditorState();
    const newContent = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      htmlMap
    );

    setEditorState( EditorState.push( editorState, newContent, 'insert-fragment' ) );

    return true;
  },
});

export default stripPastePlugin;
