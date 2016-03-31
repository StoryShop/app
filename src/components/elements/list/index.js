import reactStamp from 'react-stamp';
import { Link } from 'react-router';
import FlatButton from 'material-ui/lib/flat-button';
import ElementCardFactory from 'components/elements/card';
import { FlexLayout } from 'components/flex';

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
    const pagination = this.state.pagination;

    return [
      [ 'worldsById', this.props.world_id, 'elements', pagination, [
        '_id',
        'title',
        'content',
        'cover',
        'tags',
      ]],
    ];
  },

  modelToState ( data ) {
    // TODO: handle errors

    return {
      loading: false,
      elements: data.worldsById[ this.props.world_id ].elements,
    };
  },

  _showCard ( e, element ) {
    console.log("show element", element);
  },

  render () {
    if ( ! this.state.elements ) {
      return null;
    }

    const styles = {
      card: {
        cursor: 'pointer',
      },
    };

    const ElementCard = ElementCardFactory( React );
    const numLoaded = this.state.pagination.to - this.state.pagination.from + 1;
    const loadMoreCount = this.props.count - numLoaded;
    const elements = Object.getOwnPropertyNames( this.state.elements )
      .filter( k => k.match( /^\d+$/ ) )
      .map( k => ({ idx: k, element: this.state.elements[ k ] }) )
      .map( ({ idx, element }) => (
        <div
          key={idx}
          style={{width: '25%'}}
        >
          <ElementCard
            onClick={e => this._showCard( e, element )}
            style={styles.card}
            {...element}
          />
        </div>
      ));

    return (
      <div>
        <FlexLayout direction="row" wrap padding={10} style={{marginBottom: 10}}>
          { elements }
        </FlexLayout>

        <FlexLayout direction="row">
          <span flex></span>
          { this.state.pagination.disabled ? null : <FlatButton
            label={`Load More (${loadMoreCount})`}
            disabled={this.state.pagination.disabled}
            onClick={() => this.paginate()}
          /> }
        </FlexLayout>
      </div>
    );
  },
}, ...behaviours );


