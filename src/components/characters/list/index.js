import reactStamp from 'react-stamp';
import { Link } from 'react-router';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import CharacterIcon from 'material-ui/lib/svg-icons/social/person';
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
      [ 'worldsById', this.props.world_id, 'characters', pagination, [
        '_id',
        'name',
        'avatar',
      ]],
    ];
  },

  modelToState ( data ) {
    // TODO: handle errors

    return {
      loading: false,
      characters: data.worldsById[ this.props.world_id ].characters,
    };
  },

  render () {
    if ( ! this.state.characters ) {
      return null;
    }

    const numLoaded = this.state.pagination.to - this.state.pagination.from + 1;
    const loadMoreCount = this.props.count - numLoaded;
    const characters = Object.getOwnPropertyNames( this.state.characters )
      .filter( k => k.match( /^\d+$/ ) )
      .map( k => ({ idx: k, character: this.state.characters[ k ] }) )
      .map( ({ idx, character }) => (
        <ListItem key={idx}
          leftAvatar={character.avatar ? <Avatar src={character.avatar} /> : <Avatar icon={<CharacterIcon />} />}
          containerElement={<Link to={`/worlds/${this.props.world_id}/characters/${character._id}`} />}
          primaryText={character.name}
        />
      ));

    return (
      <div>
        <List style={{marginBottom: 10}}>
          { characters }
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


