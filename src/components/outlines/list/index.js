import reactStamp from 'react-stamp';
import { Link } from 'react-router';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import OutlineIcon from 'material-ui/lib/svg-icons/editor/format-list-numbered';
import FlatButton from 'material-ui/lib/flat-button';
import { FlexLayout } from 'components/flex';

export default React => ({
  world_id,
  outlines,
}) => {
  const outlineEls = Object.getOwnPropertyNames( outlines )
    .filter( k => k.match( /^\d+$/ ) )
    .sort()
    .reverse()
    .map( k => ({ idx: k, outline: outlines[ k ] }) )
    .map( ({ idx, outline }) => (
      <ListItem key={idx}
        leftAvatar={<Avatar icon={<OutlineIcon />} />}
        containerElement={<Link to={`/worlds/${world_id}/outlines/${outline._id}`} />}
        primaryText={outline.title}
      />
    ));

  return (
    <div>
      <List style={{marginBottom: 10}}>
        { outlineEls }
      </List>
    </div>
  );
};


