import reactStamp from 'react-stamp';
import { Link } from 'react-router';

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
      [ 'worldsById', this.props.params.world_id, 'characters', 0, [
        'id',
        'name',
      ]],
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

    const { params, children } = this.props;
    const { characters } = this.state;
    const character = characters[0];

    return (
      <ul>
        <li>
          <Link to={`/worlds/${params.world_id}/characters/${character.id}`}>
            {character.name}
          </Link>
        </li>
      </ul>
    );
  },
}, ...behaviours );

