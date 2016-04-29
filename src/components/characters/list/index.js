import React from 'react';
import { Link } from 'react-router';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import CharacterIcon from 'material-ui/lib/svg-icons/social/person';
import FlatButton from 'material-ui/lib/flat-button';
import { FlexLayout } from 'components/flex';

const CharacterList = ({ characters, world_id }) => {
  const characterEls = Object.getOwnPropertyNames( characters )
    .filter( k => k.match( /^\d+$/ ) )
    .sort()
    .reverse()
    .map( k => ({ idx: k, character: characters[ k ] }) )
    .map( ({ idx, character }) => (
      <ListItem key={idx}
        leftAvatar={character.avatar ? <Avatar src={character.avatar} /> : <Avatar icon={<CharacterIcon />} />}
        containerElement={<Link to={`/worlds/${world_id}/characters/${character._id}`} />}
        primaryText={character.name}
      />
    ))
    ;

  return (
    <div>
      <List style={{marginBottom: 10}}>
        { characterEls }
      </List>
    </div>
  );
};

CharacterList.modelPaths = function ( conf ) {
  const pagination = conf.pagination;

  return [
    [ pagination, [
      '_id',
      'name',
      'avatar',
    ]],
  ];
};

export default CharacterList;

