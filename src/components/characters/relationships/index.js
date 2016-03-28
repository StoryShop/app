import React from 'react';
import reactStamp from 'react-stamp';
import { Link } from 'react-router';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import CharacterIcon from 'material-ui/lib/svg-icons/social/person';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import withShallowCompare from 'behaviours/with-shallow-compare';
import withModel from 'behaviours/with-model';
import withPagination from 'behaviours/with-pagination';
import { FlexLayout } from 'components/flex';
import InlineEdit from 'components/inline-edit';

export default reactStamp( React ).compose({
  displayName: 'CharacterRelationships',

  propTypes: {
    id: React.PropTypes.string.isRequired,
    world_id: React.PropTypes.string.isRequired,
  },

  state: {
    loading: true,
  },

  init () {
    this.state.character_id = this.props.id;
  },

  modelPaths () {
    const character_id = this.state.character_id;
    const pagination = { from: this.state.pagination.from, to: this.state.pagination.to };
    return [
      [ 'charactersById', character_id, 'relationships', pagination ],
    ];
  },

  modelToState ( data ) {
    // TODO: handle errors

    return {
      loading: false,
      relationships: data.charactersById[ this.props.id ].relationships,
    };
  },

  componentWillReceiveProps ( newProps ) {
    if ( this.props.id !== newProps.id ) {
      this.setState({ character_id: newProps.id }, () => this.modelRefetch() );
    }
  },

  // _onChangeRelationship ( idx, key, value ) {
  //   this.modelSetValue([
  //     'charactersById',
  //     this.props.id,
  //     'relationships',
  //     idx
  //   ], { $type: 'atom', value: [ key, value ] } );
  // },

  render () {
    if ( this.state.loading ) {
      return null;
    }

    const styles = {
      container: {
        padding: '16px',
        ...this.props.style,
      },
    };

    const relationshipEls = Object.getOwnPropertyNames( this.state.relationships )
      .filter( k => k.match( /^\d+$/ ) )
      .map( k => ({ idx: k, rel: this.state.relationships[ k ] }) )
      .map( ({ idx, rel }) => (
        <ListItem
          key={idx}
          primaryText={rel.name}
          secondaryText={rel.description}
          leftAvatar={rel.avatar ? <Avatar src={rel.avatar} /> : <Avatar icon={<CharacterIcon />} />}
          containerElement={<Link to={`/worlds/${this.props.world_id}/characters/${rel._id}`} />}
        />
      ))
      ;

    const numLoaded = this.state.pagination.to - this.state.pagination.from + 1;
    const loadMoreCount = this.props.count - numLoaded;

    return (
      <FlexLayout
        element={<Paper style={styles.container} />}
        direction="column"
        >

        <h2 style={{margin: 0}}>
          Relationships
        </h2>

        <List flex>
          {relationshipEls}
        </List>

        <FlexLayout style={styles.footer}>
          <span flex></span>

          { this.state.pagination.disabled ? null : <FlatButton
            label={`Load More (${loadMoreCount})`}
            disabled={this.state.pagination.disabled}
            onClick={() => this.paginate()}
          /> }
        </FlexLayout>
      </FlexLayout>
    );
  },
}, withShallowCompare, withModel, withPagination );

