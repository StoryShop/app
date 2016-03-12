import reactStamp from 'react-stamp';
import Jumbotron from 'components/worlds/jumbotron';

export default ( React, ...behaviours ) => reactStamp( React ).compose({
  propTypes: {
    params: React.PropTypes.shape({
      world_id: React.PropTypes.string,
    }),
  },

  state: {
    loading: true,
  },

  modelPaths () {
    return [
      [ 'worldsById', this.props.params.world_id, [
        'title',
        'colour',
      ]],
      [ 'worldsById', this.props.params.world_id, 'elements', 'length' ],
      [ 'worldsById', this.props.params.world_id, 'characters', 'length' ],
      [ 'worldsById', this.props.params.world_id, 'outlines', 'length' ],
    ];
  },

  modelToState ( data ) {
    // TODO: handle errors

    return {
      loading: false,
      world: data.worldsById[ this.props.params.world_id ],
    };
  },

  _onTitleChange ( title ) {
    this.modelSetValue( [ 'worldsById', this.props.params.world_id, 'title' ], title );
  },

  render () {
    const { params, children } = this.props;
    const { world } = this.state;
    const isLoaded = world && world.outlines && world.characters && world.elements;

    return isLoaded ? (
      <div>
        <Jumbotron
          worldId={params.world_id}
          colour={world.colour}
          title={world.title}
          outlines={world.outlines.length}
          characters={world.characters.length}
          elements={world.elements.length}
          onTitleChange={title => this._onTitleChange( title )}
        />
      </div>
    ) : null;
  },
}, ...behaviours );

