import reactStamp from 'react-stamp';
import withShallowCompare from 'behaviours/with-shallow-compare';
import { FlexLayout } from 'components/flex';
import Avatar from 'components/characters/avatar';
import Attributes from 'components/characters/attributes';
import Dna from 'components/characters/dna';
import Relationships from 'components/characters/relationships';
import EditorFactory from 'components/outlines/editor';
import { Model } from 'falcor';

const $atom = Model.atom;

export default ( React, ...behaviours ) => reactStamp( React ).compose({
  propTypes: {
    params: React.PropTypes.shape({
      world_id: React.PropTypes.string,
      character_id: React.PropTypes.string,
    }),
  },

  state: {
    loading: true,
  },

  init () {
    this.state.character_id = this.props.params.character_id;
  },

  modelPaths () {
    const character_id = this.state.character_id;
    const path = [ 'charactersById', character_id ];
    return [
      [ ...path, [
        '_id',
        'name',
        'aliases',
        'avatar',
        'cover',
        'content',
      ]],
      [ ...path, 'attributes', 'length' ],
      [ ...path, 'relationships', 'length' ],
      [ ...path, 'genes', 'length' ],
    ];
  },

  modelToState ( data, onChange ) {
    // TODO: handle errors

    return {
      loading: onChange ? this.state.loading : false,
      character: data.charactersById[ this.props.params.character_id ],
    };
  },

  componentWillReceiveProps ( newProps ) {
    if ( this.props.params.character_id !== newProps.params.character_id ) {
      this.setState({ character_id: newProps.params.character_id }, () => this.modelRefetch() );
    }
  },

  _onNameChange ( name ) {
    this.modelSetValue([ 'charactersById', this.props.params.character_id, 'name' ], name );
  },

  _onAliasChange ( alias ) {
    let aliases = [];

    if ( alias !== '' ) {
      aliases = alias.split( ',' ).map( a => a.trim() );
    }

    const ref = { $type: 'atom', value: aliases };
    this.modelSetValue([ 'charactersById', this.props.params.character_id, 'aliases' ], ref );
  },

  _onOutlineChange ( raw, editorState ) {
    console.log("save", raw);
    this.modelSetValue([ 'charactersById', this.props.params.character_id, 'content' ], $atom( raw ) );
  },

  render () {
    const { character, loading } = this.state;

    if ( loading ) {
      return null;
    }

    const {
      _id,
      name,
      avatar,
      cover,
      aliases = [],
      attributes = [],
      relationships = [],
      genes = [],
      content,
    } = character;
    const numAttributes = attributes.length;
    const numRelationships = relationships.length;
    const numGenes = genes.length;

    const styles = {
      avatar: {
        marginBottom: '20px',
      },

      relationships: {
        marginBottom: '20px',
      },

      attributes: {
        marginBottom: '20px',
      },

      editor: {
        marginTop: 40,
      },

      cover: {
        width: '100%',
        height: 'auto',
      },
    };

    const Editor = EditorFactory( React, withShallowCompare );

    return (
      <FlexLayout direction="column" margin={16}>
        <div>
          { cover ? <img src={cover} style={styles.cover} /> : null }
        </div>

        <FlexLayout direction="row" margin={16}>
          <div flex="33">
            <Avatar
              name={name}
              avatar={avatar}
              aliases={aliases.join(', ')}
              onNameChange={name => this._onNameChange( name )}
              onAliasChange={alias => this._onAliasChange( alias )}
              style={styles.avatar}
            />

            <Attributes id={_id} style={styles.attributes} count={numAttributes} />

            <Relationships
              id={_id}
              style={styles.relationships}
              count={numRelationships}
              world_id={this.props.params.world_id}
            />
          </div>

          <div flex="66">
            <Dna id={_id} style={styles.dna} count={numGenes} />

            <div style={styles.editor}>
              <h1>Character Notes</h1>

              <Editor
                ref="editor"
                onChange={e => this._onOutlineChange( e )}
                value={content}
              />
            </div>
          </div>
        </FlexLayout>
      </FlexLayout>
    );
  },
}, ...behaviours );

