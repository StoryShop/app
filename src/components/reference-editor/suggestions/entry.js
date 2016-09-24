import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';

const EntryComponent = ({ mention, className, ...props }) => (
  <ListItem
    leftAvatar={<Avatar src={mention.get('avatar')} />}
    {...props}
  >
    {mention.get('name')}
  </ListItem>
);

export default EntryComponent;
