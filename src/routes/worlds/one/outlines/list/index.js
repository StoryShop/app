import reactStamp from 'react-stamp';
import withShallowCompare from 'behaviours/with-shallow-compare';
import withModel from 'behaviours/with-model';
import withPagination from 'behaviours/with-pagination';
import OutlineListFactory from 'components/outlines/list';

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
      [ 'worldsById', this.props.params.world_id, 'outlines', 'length' ],
    ];
  },

  modelToState ( data ) {
    return {
      loading: false,
      outlines: data.worldsById[ this.props.params.world_id ].outlines,
    };
  },

  render () {
    if ( ! this.state.outlines ) {
      return null;
    }

    const OutlineList = OutlineListFactory(
      React,
      withModel,
      withPagination,
      withShallowCompare
    );

    const { outlines } = this.state;

    return (
      <OutlineList world_id={this.props.params.world_id} count={outlines.length} />
    );
  },
}, ...behaviours );

