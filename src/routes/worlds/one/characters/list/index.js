import reactStamp from 'react-stamp';
import withShallowCompare from 'behaviours/with-shallow-compare';
import withModel from 'behaviours/with-model';
import withPagination from 'behaviours/with-pagination';
import CharacterListFactory from 'components/characters/list';

export default ( React, ...behaviours ) => reactStamp( React ).compose({
  propTypes: {
    params: React.PropTypes.shape({
      world_id: React.PropTypes.string.isRequired,
    }),
  },

  state: {
    loading: true,
  },

  modelPaths () {
    return [
      [ 'worldsById', this.props.params.world_id, 'characters', 'length' ],
    ];
  },

  modelToState ( data ) {
    // TODO: handle errors

    return {
      loading: false,
      characters: data.worldsById[ this.props.params.world_id ].characters,
    };
  },

  render () {
    if ( ! this.state.characters ) {
      return null;
    }

    const CharacterList = CharacterListFactory(
      React,
      withModel,
      withPagination,
      withShallowCompare
    );

    const { characters } = this.state;

    return (
      <CharacterList world_id={this.props.params.world_id} count={characters.length} />
    );
  },
}, ...behaviours );

