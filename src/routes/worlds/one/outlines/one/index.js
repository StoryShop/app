import reactStamp from 'react-stamp';
import RaisedButton from 'material-ui/lib/raised-button';
import { Model } from 'falcor';
import withShallowCompare from 'behaviours/with-shallow-compare';
import { FlexLayout } from 'components/flex';
import InlineEdit from 'components/inline-edit';
import EditorFactory from 'components/outlines/editor';

const $atom = Model.atom;

export default ( React, ...behaviours ) => reactStamp( React ).compose({
  propTypes: {
    params: React.PropTypes.shape({
      world_id: React.PropTypes.string,
      outline_id: React.PropTypes.string,
    }),
  },

  state: {
    loading: true,
  },

  modelPaths () {
    const path = [ 'outlinesById', this.props.params.outline_id ];
    return [
      [ ...path, [
        '_id',
        'title',
        'content'
      ]],
    ];
  },

  modelToState ( data, onChange ) {
    return {
      loading: onChange ? this.state.loading : false,
      outline: data.outlinesById[ this.props.params.outline_id ],
    };
  },

  _onTitleChange ( title ) {
    this.modelSetValue([ 'outlinesById', this.props.params.outline_id, 'title' ], title );
  },

  focus ( e ) {
    this.refs.editor.focus();
  },

  _onChange ( raw, editorState ) {
    console.log("save", raw);
    this.modelSetValue([ 'outlinesById', this.props.params.outline_id, 'content' ], $atom( raw ) );
  },

  render () {
    const Editor = EditorFactory( React, withShallowCompare );
    const { outline, loading } = this.state;

    if ( loading ) {
      return null;
    }

    const { _id, title, content } = outline;

    const styles = {
      container: {
        // height: '100%',
      },

      title: {
        margin: '0 0 20px',
        fontSize: '2em',
        fontWeight: 400,
      },
    };

    return (
      <FlexLayout direction="column" style={styles.container} onClick={() => this.focus()}>
        <InlineEdit value={title} onChange={title => this._onTitleChange( title )} style={styles.title} />

        <Editor
          ref="editor"
          onChange={e => this._onChange( e )}
          value={content}
        />
      </FlexLayout>
    );
  },
}, ...behaviours );

