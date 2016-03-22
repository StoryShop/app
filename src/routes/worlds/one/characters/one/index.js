import reactStamp from 'react-stamp';
import { FlexLayout } from 'components/flex';
import Avatar from 'components/characters/avatar';
import Attributes from 'components/characters/attributes';
import Dna from 'components/characters/dna';

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

  modelPaths () {
    const path = [ 'charactersById', this.props.params.character_id ];
    return [
      [ ...path, [
        '_id',
        'name',
        'aliases',
        'avatar',
      ]],
      [ ...path, 'attributes', 'length' ],
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

  render () {
    const { character, loading } = this.state;

    if ( loading ) {
      return null;
    }

    const { _id, name, aliases, avatar } = character;
    const numAttributes = character.attributes.length;
    const numGenes = character.genes.length;

    const styles = {
      avatar: {
        marginBottom: '20px',
      },

      attributes: {
        //
      },
    };

    return (
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
        </div>

        <div flex="66">
          <Dna id={_id} style={styles.dna} count={numGenes} />
        </div>
      </FlexLayout>
    );
  },
}, ...behaviours );

