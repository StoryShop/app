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

const stripPastePlugin = (convert = convertFromHTML) => ({
  handlePastedText(text, html, { getEditorState, setEditorState }) {
    if (html) {
      const htmlFrag = convert(html);
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

        const newState = insertFragment(getEditorState(), htmlMap);
        setEditorState(newState);
        return true;
      }
    }
  },
});

export default stripPastePlugin;
