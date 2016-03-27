import reactStamp from 'react-stamp';
import withShallowCompare from 'behaviours/with-shallow-compare';
import withModel from 'behaviours/with-model';
import withPagination from 'behaviours/with-pagination';
import ElementListFactory from 'components/elements/list';

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
      [ 'worldsById', this.props.params.world_id, 'elements', 'length' ],
    ];
  },

  modelToState ( data ) {
    return {
      loading: false,
      elements: data.worldsById[ this.props.params.world_id ].elements,
    };
  },

  render () {
    if ( ! this.state.elements ) {
      return null;
    }

    const ElementList = ElementListFactory(
      React,
      withModel,
      withPagination,
      withShallowCompare
    );

    const { elements } = this.state;

    return (
      <ElementList world_id={this.props.params.world_id} count={elements.length} />
    );
  },
}, ...behaviours );

