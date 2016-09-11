import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { FlexLayout } from 'components/flex';

// type Item = {
//   _id: string,
//   name: string,
// };
// type ItemList = Array<Item>;

export default ({
  character,
  items = {},
}) => {
  const rows = Object.getOwnPropertyNames( items )
    .filter( k => k.match( /^\d+$/ ) )
    .sort()
    .map( k => ({ idx: k, item: items[ k ] }) )
    .map( ({ idx, item: { name } }) => <ListItem key={idx} primaryText={name} /> )
    ;

  return (
    <FlexLayout direction="column">
      <h2>Items for {character.name}</h2>

      <List>
        { rows }
      </List>
    </FlexLayout>
  );
};

