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
import { FlexLayout } from 'components/flex';
import InlineEdit from 'components/inline-edit';

const Relationships = ({
  world_id,
  relationships,
  style = {},
  ...props
}) => {
  const styles = {
    container: {
      padding: '16px',
      ...style,
    },
  };

  const relationshipEls = Object.getOwnPropertyNames( relationships )
    .filter( k => k.match( /^\d+$/ ) )
    .sort()
    .reverse()
    .map( k => ({ idx: k, rel: relationships[ k ] }) )
    .map( ({ idx, rel }) => (
      <ListItem
        key={idx}
        primaryText={rel.name}
        secondaryText={rel.description}
        leftAvatar={rel.avatar ? <Avatar src={rel.avatar} /> : <Avatar icon={<CharacterIcon />} />}
        containerElement={<Link to={`/worlds/${world_id}/characters/${rel._id}`} />}
      />
    ))
    ;

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
    </FlexLayout>
  );
};

Relationships.modelPaths = function ( conf ) {
  return [
    [ 'relationships', conf.pagination ],
  ];
};

export default Relationships;

