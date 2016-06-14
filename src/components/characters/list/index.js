import React from 'react';
import reactStamp from 'react-stamp';
import { Link } from 'react-router';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import Avatar from 'material-ui/lib/avatar';
import CharacterIcon from 'material-ui/lib/svg-icons/social/person';
import FlatButton from 'material-ui/lib/flat-button';
import Prompt from 'components/prompt';
import { FlexLayout } from 'components/flex';
import * as paths from 'utils/paths';

export default reactStamp( React ).compose({
  state: {
    addingCharacter: false,
  },

  _promptForCharacter () {
    this.setState({ addingCharacter: true });
  },

  _addCharacter ( name ) {
    this.props.addCharacter( this.props.world_id, name );
  },

  render () {
    const { characters, world_id } = this.props;

    const characterEls = Object.getOwnPropertyNames( characters )
      .filter( k => k.match( /^\d+$/ ) )
      .sort()
      .reverse()
      .map( k => ({ idx: k, character: characters[ k ] }) )
      .map( ({ idx, character: { avatar, _id, name } }) => (
        <ListItem key={idx}
          leftAvatar={avatar && avatar.url ? <Avatar src={avatar.url} /> : <Avatar icon={<CharacterIcon />} />}
          containerElement={<Link to={paths.character( world_id, _id )} />}
          primaryText={name}
        />
      ))
      ;

    return (
      <FlexLayout direction="column">
        {
          characterEls.length
            ? <List style={{marginBottom: 10}}>{ characterEls }</List>
            : <p>You have no characters. Click the "+" button to create one.</p>
        }

        <span flex />

        <FlexLayout direction="row">
          <span flex />
          <FloatingActionButton
            onClick={e => this._promptForCharacter()}
            disableTouchRipple={true}
          >
            <AddIcon />
          </FloatingActionButton>
          <Prompt
            okLabel='Create'
            label='Character Name'
            title='Create a New Character'
            setValue={val=>this._addCharacter( val )}
            open={this.state.addingCharacter}
            onClose={e=>this.setState({ addingCharacter: false })}
          />
        </FlexLayout>
      </FlexLayout>
    );
  },

  statics: {
    modelPaths: function () {
      return [
        [
          [
            '_id',
            'name',
          ],
        ],
        [
          'avatar',
          'url',
        ],
      ];
    },
  },
});

