import reactStamp from 'react-stamp';

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
    return [
      [ 'charactersById', this.props.params.character_id, [
        'id',
        'name',
      ]],
    ];
  },

  modelToState ( data ) {
    // TODO: handle errors

    return {
      loading: false,
      character: data.charactersById[ this.props.params.character_id ],
    };
  },

  render () {
    const { character } = this.state;

    if ( ! character ) {
      return null;
    }

    return (
      <div>
        <h1>{character.name}</h1>
      </div>
    );
  },
}, ...behaviours );

