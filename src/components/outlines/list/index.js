import reactStamp from 'react-stamp';
import { Link } from 'react-router';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import OutlineIcon from 'material-ui/lib/svg-icons/editor/format-list-numbered';
import FlatButton from 'material-ui/lib/flat-button';
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
      [ 'worldsById', this.props.world_id, 'outlines', pagination, [
        '_id',
        'title',
      ]],
    ];
  },

  modelToState ( data ) {
    // TODO: handle errors

    return {
      loading: false,
      outlines: data.worldsById[ this.props.world_id ].outlines,
    };
  },

  render () {
    if ( ! this.state.outlines ) {
      return null;
    }

    const numLoaded = this.state.pagination.to - this.state.pagination.from + 1;
    const loadMoreCount = this.props.count - numLoaded;
    const outlines = Object.getOwnPropertyNames( this.state.outlines )
      .filter( k => k.match( /^\d+$/ ) )
      .map( k => ({ idx: k, outline: this.state.outlines[ k ] }) )
      .map( ({ idx, outline }) => (
        <ListItem key={idx}
          leftAvatar={<Avatar icon={<OutlineIcon />} />}
          containerElement={<Link to={`/worlds/${this.props.world_id}/outlines/${outline._id}`} />}
          primaryText={outline.title}
        />
      ));

    return (
      <div>
        <List style={{marginBottom: 10}}>
          { outlines }
        </List>

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


