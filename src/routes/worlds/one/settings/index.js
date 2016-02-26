import reactStamp from 'react-stamp';

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
    ];
  },

  modelToState ( data ) {
    // TODO: handle errors
    console.log("got data in settings", data);

    return {
      loading: false,
      world: data.worldsById[ this.props.params.world_id ],
    };
  },

  render () {
    const { children } = this.props;
    const { world } = this.state;

    return world ? (
      <div>
        <h1 className="header">{ this.state.world.title }</h1>
        { children }
      </div>
    ) : null;
  },
}, ...behaviours );

